import React, { Component } from 'react'
import { Alert, StyleSheet, ScrollView, Text } from 'react-native'
import { ThemeProvider , Button, Input, Image} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'



class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  onLogin() {
    const { email, password } = this.state

    Alert.alert('Your Account!', `${email} + ${password}`)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ScrollView style={styles.container}>
          <Image
              source={{ uri: 'https://o.remove.bg/downloads/836917fd-34f9-4f86-8a4b-315d5a543938/ever-medical-technologies_f7d23dae-f6e7-11e9-8110-b9263a77418b-removebg-preview.png' }}
              style={{ width: 150, height: 150 }}
              containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
          />

        <Input
          leftIcon={
              <Icon
              name='envelope-o'
              size={20}
              color='#0085E6'
              />
          }
          placeholder={'Email'}
          onChangeText={(email) => this.setState({ email })}
        />
      <Input
        leftIcon={
          <Icon
          name='lock'
          size={20}
          color='#0085E6'
          />
        }
        placeholder={'Password'}
        onChangeText={(password) => this.setState({ password })}
        secureTextEntry={true}
      />
      <Button icon={
        <Icon
        name='sign-in'
        size={20}
        color='#fff'
      />}  
      buttonStyle={{
        backgroundColor: "green"
      }} 
      title={'  Login'} onPress={() => this.props.navigation.navigate('CustomerScreen')} />
      
      <Text style={styles.textstyle}>or</Text>
      
      <Button icon={
        <Icon
        name='user-plus'
        size={20}
        color='#fff'
        />
      } title={'  Sign Up'} onPress={() => this.props.navigation.navigate('Register')} />
        </ScrollView>
      </ThemeProvider>
    )
  }
}

const theme = {
  Button: {
      raised: true
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
      justifyContent: 'center',
    },
    textstyle:{
      padding: 20,
      fontSize: 20,
      textAlign: 'center',
    },
})

export default Login;