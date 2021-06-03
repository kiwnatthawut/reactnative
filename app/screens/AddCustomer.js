import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator , View } from 'react-native'
import { ThemeProvider , Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import firebase from '../../database/firebaseDb';


class AddCustomer extends Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection("customers");
        this.state = {
          email: '',
          firstname: '',
          lastname: '',
          age: '',
          mobile: '',
          weight: '',
          isLoading: false
        };
      }

      inputValueUpdate = (val, prop) => {
        const state = this.state
        state[prop] = val;
        this.setState(state);
      }

     async storeCustomer() {
        if (this.state.email === '' ) {
          alert('Please fill in your email and detail');
        } 
        else {
          this.setState({
              isLoading: true,
          });
         await this.dbRef.add({
              email: this.state.email,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              age: this.state.age,
              mobile: this.state.mobile,
              weight: this.state.weight,
            
          }).then((res)  => 
          {
            this.setState({
                email: '',
                firstname: '',
                lastname: '',
                age: '',
                mobile: '',
                weight: '',
                isLoading: false,
              });
              this.props.navigation.navigate('CustomerScreen')
          }) 
            .catch((err) => {
                console.log('Error found: ', err);
                this.setState({
                    isLoading: false,
                });
            });
        }
      }

      render() {
          if (this.state.isLoading) {
              return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
              )
          }
        return (
          <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
            <Input
              leftIcon={
                  <Icon
                  name='envelope-o'
                  size={20}
                  color='#0085E6'
                  />
              }
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email' )}
              
            />
          <Input
            leftIcon={
                <Icon
                name='user'
                size={20}
                color='#0085E6'
              />
            }
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
            leftIcon={
              <Icon
              name='mobile'
              size={20}
              color='#0085E6'
              />
            }
            placeholder={'Mobile'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'mobile' )}
          />
           <Input leftIcon={
              <Icon
              name='info-circle'
              size={20}
              color='#0085E6'
              />
            }
            placeholder={'Age'}
            value={this.state.age}
            onChangeText={(val) => this.inputValueUpdate(val, 'age' )}
          />
          <Input
            placeholder={' Weight'}
            value={this.state.weight}
            onChangeText={(val) => this.inputValueUpdate(val, 'weight' )}
          />
          <Button icon={
              <Icon
                name='users'
                size={20}
                color='#fff'
              />
          } title={'  Add Customer'} 
            onPress={() => this.storeCustomer()} />
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
    padding: 30
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

export default AddCustomer;