/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    View,
    Text,
    StyleSheet,
    Button,

} from 'react-native';
import react from 'react';

const Tab = createBottomTabNavigator();

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
                        },
                    }}
                >
                    <Tab.Screen name="Home" component={SettingsScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>


        );
    }
}


class ProfileScreen extends React.Component {
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
            <View style = {styles.container}>
                <Button
                    style={styles.logoutBtn}
                    title="Logout"
                    onPress={() => this.doLogout()}
                />
            </View>
        );
    }
}
class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.tabs}>
                <Text>Home!</Text>
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
});
export default DashboardScreen;

