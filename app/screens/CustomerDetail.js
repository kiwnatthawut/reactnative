import React, { Component } from 'react'
import { Alert, StyleSheet, ScrollView } from 'react-native'

import { ThemeProvider , Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import firebase from '../../database/firebaseDb';



class CustomerDetail extends Component {

  constructor() {
    super();
    this.state = {
        email: '',
        firstname: '',
        lastname: '',
        age: '',
        mobile: '',
        weight: '',
        isLoading: true
    };
  }
  componentDidMount() {
    const dbRef = firebase.firestore().collection("customers").doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
          mobile: user.mobile,
          weight: user.weight,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateCustomer() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection("customers").doc(this.state.key);
    updateDBRef.set({
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      mobile: this.state.mobile,
      weight: this.state.weight,
    }).then((docRef) => {
      this.setState({
        email: '',
        firstname: '',
        lastname: '',
        age: '',
        mobile: '',
        weight: '',
        isLoading: false,
      });
      this.props.navigation.navigate('CustomerScreen');
    })
    .catch((err) => {
      console.error("Error: ", err);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteCustomer() {
    const dbRef = firebase.firestore().collection("customers").doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('CustomerScreen');
      })
  }

  buttonAlertDelete = () => {
    Alert.alert(
        'Delete Customer',
        'Are you sure?',
        [
            {text: 'Yes', onPress: () => this.deleteCustomer()},
            {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'}
        ],
        {
            cancelable: true
        }
    );
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <ScrollView style={styles.container}>
        <Input
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email' )}
            />
          <Input
            placeholder={'Firstname'}
            value={this.state.firstname}
            onChangeText={(val) => this.inputValueUpdate(val, 'firstname' )}
            />
            <Input
            placeholder={'Lastname'}
            value={this.state.lastname}
            onChangeText={(val) => this.inputValueUpdate(val, 'lastname' )}
            />
          <Input
            placeholder={'Mobile'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'mobile' )}
          />
           <Input
            placeholder={'Age'}
            value={this.state.age}
            onChangeText={(val) => this.inputValueUpdate(val, 'age' )}
          />
          <Input
            placeholder={'Weight'}
            value={this.state.weight}
            onChangeText={(val) => this.inputValueUpdate(val, 'weight' )}
          />
          
          <Button
              icon={
                <Icon
                name="edit"
                size={15}
                color="#fff"
                />
              }
              title={'  Update'} onPress={() => this.updateCustomer() }
              containerStyle={{
                marginTop: 20,
              }} 
              buttonStyle={{ 
                borderRadius: 35, 
              }}/>
          <Button
              icon={
                <Icon
                name="trash"
                size={15}
                color="#fff"
                />
              }
              title={'  Delete'} onPress={() => this.deleteCustomer() }
              containerStyle={{
                marginTop: 20,
              }} 
              buttonStyle={{ 
                borderRadius: 35, 
                backgroundColor: "red"
              }}/>
      </ScrollView>
      </ThemeProvider>
    );
  }
}


const theme = {
    Button: {
        raised: false
    }
  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 36
    },
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
  })
  
export default CustomerDetail;