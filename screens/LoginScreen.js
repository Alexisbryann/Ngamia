/* eslint-disable prettier/prettier */
import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,

} from 'react-native';
class LoginScreen extends React.Component {

  state = {
    email: '',
    password: '',
    loading: false,
  }

  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }

  doLogin() {
    const { email, password } = this.state;
    if (email && password) {
      const req = {
          'email': email,
          'password': password,
          'transporter': true,
          'driver': false,
          'agent': false,
          'trader': false,
      };
      this.setState({
        loading: true,
      });
      axios.post('https://apide.ngamia.africa/api/MyAccount/Login',req)
        .then(
          res => {
            this.setState({
              loading: false,
            });
            AsyncStorage.setItem('token', res.data.profile.token);
            AsyncStorage.setItem('dealerID', res.data.business.dealerID)
            .then(res => {
            this.props.navigation.navigate('App');
            console.log(JSON.stringify.message);
            });
          },
          err => {
            this.setState({
              loading: false,
            });
            Alert.alert('Username or password is wrong');
            console.log(err.message);
          });
        }
    else {
      Alert.alert('Enter Username & Password');
    }
  }

  render() {
    const { email, password, loading } = this.state;
    return (
      <View style={styles.container} >
        <Text style={styles.name}>NGAMIA DRIVER APP</Text>

        <TouchableOpacity>
          <Image style={styles.image} />
        </TouchableOpacity>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email."
            placeholderTextColor="#003f5c"
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => this.onChangeHandle('email',value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => this.onChangeHandle('password',value)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}
          onPress={() => this.doLogin()}
          // disabled={loading}
        >
          {/* {loading ? 'Loading... ' : 'Signin'} */}
          <Text style={styles.Text}>Login</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

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
