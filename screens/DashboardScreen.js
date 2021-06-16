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
    FlatList,
    Image,
    ActivityIndicator,
    List,
    ListItem,

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

    render() {
        return (
            <View style={styles.container}>
                <Text>We'll display the user profile on this page.</Text>

            </View>
        );
    }
}
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
        };
    }
    renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text>{item.jobs.new}</Text>
                <Text>{item.jobs.accepted}</Text>
                {/* <Image style={styles.Image}
                    source={{ uri: item.jobs.newJobs.imageUrl }} /> */}

            </View>
        );
    }

    componentDidMount() {
        this.getJobs();
    }
    getJobs() {
        const dealerID = AsyncStorage.getItem('dealerID');
        const token = AsyncStorage.getItem('token');
        const bearer = 'Bearer ' + token;

        fetch(jobsApi,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer,
                },
                body: JSON.stringify({dealerID}),
            })
            .then(response => response.json()
                .then(responseJson => {
                    console.log(responseJson);
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.jobs,
                    }).
                        catch((error) => {
                            console.log(error.message);
                        });
                }).catch((error) => {
                    console.log(error);
                }),
            );
    }

    render() {


        const { isLoading, dataSource } = this.state;

        if (isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList styles={styles.item}
                        data={dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item}
                    />
                    <Text style={styles.container}>We'll display Posted jobs here</Text>
                </View>
            );
        }
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

