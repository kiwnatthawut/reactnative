import React, { Component } from 'react'
import { Alert, StyleSheet, ScrollView } from 'react-native'
import { ThemeProvider , Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'


class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    }
  }

  login = async () => {
    await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
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
      <Input
        leftIcon={
            <Icon
            name='user'
            size={20}
            color='#0085E6'
          />
        }
        placeholder={'Firstname'}
        onChangeText={(firstname) => this.setState({ firstname })}
        />
        <Input
        leftIcon={
            <Icon
            name='user'
            size={20}
            color='#0085E6'
          />
        }
        placeholder={'Lastname'}
        onChangeText={(lastname) => this.setState({ lastname })}
        />
      <Button leftIcon={
          <Icon
            name='user-plus'
            size={20}
            color='#0085E6'
          />
      } title={'Sign Up'}/>
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
      justifyContent: 'center'
    }
})

export default Register;