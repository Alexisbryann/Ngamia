/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import axios from 'axios';

import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const axiosApiCall = () => {
    axios
      .post('https://apide.ngamia.africa/api/MyAccount/Login', {
        email: email,
        password: password,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>NGAMIA DRIVER APP</Text>

      {/* <TouchableOpacity>
        <Image style={styles.image}
          source={require('./assets/logo.png')} />
      </TouchableOpacity> */}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}
        onPress= {() => navigation.navigate('App')}
      >
        <Text style = {styles.Text}>Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputView: {
    backgroundColor: '#f5b14b',
    borderRadius: 20,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  image: {
    marginBottom: 30,
  },

  name: {
    height: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6b471c',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#6b471c',
  },
});

export default LoginScreen;
