import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native'
import { Button, Badge , ListItem, ThemeProvider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import firebase from '../../database/firebaseDb';

class CustomerScreen extends Component {
  constructor() {
    super();

    this.firestoreRef = firebase.firestore().collection("customers");
    
    this.state = {
        isLoading: true,
        userArr: []
    };
}

componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
}

componentWillUnmount() {
    this.unsubscribe();
}

getCollection = async (querySnapShot) => {
    const userArr = [];
    querySnapShot.forEach((res) => {
        const { email, firstname, lastname, mobile, age, weight } = res.data();
        userArr.push({
            key: res.id,
            res,
            email,
            firstname,
            lastname,
            age,
            mobile,
            weight
        });
    });
    this.setState({
        userArr,
        isLoading: false,
    });
}

render() {

    if (this.state.isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        )
    }

    return(
        <ThemeProvider theme={theme}>
        <ScrollView style={styles.container}>
          <Button 
              icon={
              <Icon
                name='users'
                size={20}
                color='#fff'
              />} 
              title={'  Add Customer'} onPress={() => this.props.navigation.navigate('AddCustomer')}
              buttonStyle={{ 
                width: "50%",
                borderRadius: 35,
              }} />
            {
                this.state.userArr.map((item, i) => {
                    return (
                        <ListItem
                            style={styles.listCustomer}
                            key={i}
                            bottomDivider
                            onPress={() => {
                                this.props.navigation.navigate('CustomerDetail', {
                                    userKey: item.key
                                });
                            }}>   
                            <Badge 
                                value={i+1}
                            />
                            <ListItem.Content>
                        <ListItem.Title>{item.firstname} {item.lastname}</ListItem.Title>
                                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron/>
                        </ListItem>
                    );
                })
            }

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
  listCustomer: {
      
  }

})

export default CustomerScreen;