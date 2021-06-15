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
    ActivityIndicator,
    Image,
    Alert,

} from 'react-native';

const Tab = createBottomTabNavigator();
const jobsApi = 'https://apide.ngamia.africa/api/Transporter/GetPostedJobs';
// const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
// const {profileArray} = this.props.navigation.getParam('profileArray');
// const { itemId, otherParam } = route.params;

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

    // constructor() {
    //     super();
    // }
    // render() {
    //     const prof = this.props.navigation.getParams('otherParam', 'NO-User');
    //     return (
    //         <View style={styles.container}>
    //             <Text>{JSON.stringify(prof)}</Text>
    //         </View>
    //     );
    // }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isLoading: true,
    //         dataSource: [],
    //     };
    // }

    // componentDidMount() {
    //     async () => {
    //         try {
    //             // const dealerID = await (await AsyncStorage.getItem('dealerID'));
    //             const token = await (await AsyncStorage.getItem('token'));

    //             fetch('https://apide.ngamia.africa/api/MyAccount/Login', {
    //                 body: dealerID,
    //             }
    //                 .then((response) => response.json())
    //                 .then((responseJson) => {
    //                     this.setState({
    //                         isLoading: false,
    //                         dataSource: responseJson,
    //                     });
    //                 }));
    //         }
    //         catch (error) {
    //             console.log(error.message);
    //         }
    //     };

    // }

    // _renderItem = ({ item, index }) => {
    //     return (
    //         <View style={styles.item}>
    //             <Text>{item.jobs}</Text>
    //         </View>
    //     );
    // }

    // render() {
    //     // let {container} = styles;
    //     let { dataSource, isLoading } = this.state;

    //     if (isLoading) {
    //         return (
    //             <View style={styles.container}>
    //                 <ActivityIndicator size="large" animating />
    //             </View>
    //         );
    //     } else {
    //         return (
    //             <View style={styles.container}>
    //                 <FlatList
    //                     data={dataSource}
    //                     renderItem={this._renderItem}
    //                     keyExtractor={(item, index) => index.toString()}
    //                 />
    //             </View>
    //         );
    //     }
    // }

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

    doLogout() {
        AsyncStorage.removeItem('token')
            .then(
                res => {
                    this.props.navigation.navigate('Auth');
                }
            );
    }
    _renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text>{item.jobs.newJobs.id}</Text>
                <Text>{item.jobs.newJobs.subscriber}</Text>
                <Image style={{ width: 50, height: 50 }}
                    source={{ uri: item.jobs.newJobs.imageUrl }} />

            </View>
        );
    }

    componentDidMount() {
        const dealerID = AsyncStorage.getItem('dealerID');
        const token = AsyncStorage.getItem('token');
        const bearer = 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVCQkU0MDI2MUUwRTlGMzUwOTM2NTAyRkIxM0VENjc3NEVENDk0MTkiLCJ0eXAiOiJKV1QifQ.eyJ1bmlxdWVfbmFtZSI6InRyYW5zcG9ydGVyQG5nYW1pYS5hZnJpY2EiLCJOQU1FIjoiTkhQIFRyYW5zcG9ydGVyIiwicGVybWlzc2lvbiI6IklzVHJhbnNwb3J0ZXIiLCJDb2RlIjoiRFQwMDAzIiwiU2VyaWFsIjoiWExTTk5MQlAxMTJGS0VHUyIsIm5iZiI6MTYyMjc5MTc4NiwiZXhwIjoxNjU0MzI3Nzg2LCJpYXQiOjE2MjI3OTE3ODYsImlzcyI6Imh0dHBzOi8vYXBpZGUubmdhbWlhLmFmcmljYSIsImF1ZCI6Imh0dHBzOi8vYXBpZGUubmdhbWlhLmFmcmljYSJ9.elgBbYvMITjkl9E9HpxTF3nYhl2qfMqHLLQR-DH16fz1y1mXeNsRwx9DBszS0SOo0J5ihqJQBaWK40idP5ObvIlTqm08HWLWTk1hhaw2YgS7Oh5j8mYh6UIJsf46KaNW8IBq5O6b2nkRSdkG8l-9dh6eEIUbH7Jm5CfVjXZ_hG2JH_74N9bhkue2v55QIXGjJjCJ-EIDHUlKkcNNSWK9HK7v4qqqiakcWY3QS35K-7k5K2CwjGejAGngpqsX72G2_pTQCzB6hYX46g5m5PML0bbQNsCSVK5oTchSqV76gZcSKg_adc7FAVcuZl967Xl2EqjU-s2SW4xzSrgijOrnpg';

        fetch(jobsApi, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                withCredentials: true,
                credentials: 'include',
                Authorization: bearer,
            },
            body: ({
                dealerID: 112,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    dataSource: json.jobs.newJobs,
                }).
                    catch((error) => {
                        console.log(error.message);
                    });
            });
        }
            render() {

            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index}
                    />
                    <Button
                        style={styles.logoutBtn}
                        title="Logout"
                        onPress={() => this.doLogout()}
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

