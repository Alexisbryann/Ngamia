/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    Image,

} from 'react-native';
import fetch from 'node-fetch';

const Tab = createBottomTabNavigator();
const jobsApi = 'https://apide.ngamia.africa/api/Transporter/GetPostedJobs';

class DashboardScreen extends React.Component {

    static Stack = createStackNavigator();

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: '#6b471c',
                        inactiveTintColor: '#f5b14b',
                        labelStyle: {
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>


        );
    }
}

class ProfileScreen extends React.Component {


    //   state = {
    //     email: '',
    //     password: '',
    //     loading: false,
    //   }

    //   onChangeHandle(state, value) {
    //     this.setState({
    //       [state]: value,
    //     });
    //   }

    //   doLogin() {
    //     const { email, password } = this.state;
    //     if (email && password) {
    //       const req = {
    //         'email': email,
    //         'password': password,
    //         'transporter': true,
    //         'driver': false,
    //         'agent': false,
    //         'trader': false,
    //       };
    //       this.setState({
    //         loading: true,
    //       });
    //       var profileArray = [];
    //       axios.post('https://apide.ngamia.africa/api/MyAccount/Login', req)
    //         .then(
    //           res => {
    //             this.setState({
    //               loading: false,
    //             })
    //             // AsyncStorage.setItem('token', res.data.profile.token)
    //             // var items = [['token', res.profile.token], ['dealerID', res.business.dealerID]];
    //             // AsyncStorage.setItem('KEY', JSON.stringify(items))
    //             .then(res => {
    //               const profileData = {
    //                 id: res.data.profile.userId,
    //                 username: res.data.profile.userName,
    //                 email: res.data.profile.email,
    //                 name: res.data.profile.name,
    //                 dob: res.data.profile.dob,
    //                 phonenumber: res.data.profile.phoneNumber,
    //               };
    //               profileArray.push(profileData);
    //               this.props.navigation.navigate('App');
    //               console.log(JSON.stringify.message);
    //             });
    //           },
    //           err => {
    //             this.setState({
    //               loading: false,
    //             });
    //             Alert.alert('Username or password is wrong');
    //             console.log(err.message);
    //           });
    //     }
    //     else {
    //       Alert.alert('Enter Username & Password');
    //     }
    //   }

    doLogout() {
        AsyncStorage.removeItem('token')
            .then(
                res => {
                    this.props.navigation.navigate('Auth');
                }
            );
    }
    render() {
        return (
            <View style={styles.container}>
                <Button
                    style={styles.logoutBtn}
                    title="Logout"
                    onPress={() => this.doLogout()}
                />

            </View>
        );
    }
}
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
    }
    renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text>{item.status}</Text>
                <Text>{item.jobs}</Text>
                <Image style={styles.Image}
                    source={{ uri: item.jobs.newJobs.imageUrl }} />

            </View>
        );
    }

    componentDidMount() {
        const dealerID = AsyncStorage.getItem('dealerID');
        const token = AsyncStorage.getItem('token');
        const bearer = 'Bearer ' + token;

        fetch(jobsApi,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer,
                },
                body: dealerID,
            })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson.message);
                this.setState({
                    dataSource: (responseJson.jobs.status),
                }).
                    catch((error) => {
                        console.log(error.message);
                    });
            }).catch(function (error) {
                console.log(error);
            });
    }
    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabs: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Image: {
        width: 50,
        height: 50,
    },
    logoutBtn: {
        width: '80%',
        borderRadius: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#6b471c',
    },
    item: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#6b471c',
    },
});
export default DashboardScreen;

