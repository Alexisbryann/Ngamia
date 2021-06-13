/* eslint-disable prettier/prettier */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    View,
    Text,
    StyleSheet,
    Button,

} from 'react-native';

class DashboardScreen extends React.Component {

    doLogout(){
        AsyncStorage.removeItem('token')
            .then(
                res => {
                    this.props.navigation.navigate('Auth');
                }
            );
    }

    render(){
    return (
        <View
            style={styles.container}>
            <Text>Welcome home</Text>

            <View >
                <Button style={styles.logoutBtn}
                    title="Logout"
                    onPress={() => this.doLogout()}
                />
            </View>
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
