/* eslint-disable prettier/prettier */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    ActivityIndicator,
    StyleSheet,

} from 'react-native';
class AuthLoadingScreen extends React.Component {

    constructor() {
        super();
        this.checkToken();
    }

    checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                this.props.navigation.navigate('App');
            }
            else {
                this.props.navigation.navigate('Auth');
            }
        }
        catch (error) {
            console.log(error.message);
        }
    };

    render() {
        return (
            <View style={[styles.container]} >
                <ActivityIndicator size="large" color="#6b471c" />
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
});
export default AuthLoadingScreen;
