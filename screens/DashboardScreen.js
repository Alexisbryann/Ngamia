/* eslint-disable prettier/prettier */
import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Button,

} from 'react-native';

const DashboardScreen = ({ navigation }) => {

    return (
        <View
            style={styles.container}>
            <Text>Welcome home</Text>

            <View >
                <Button style = {styles.logoutBtn}
                    title="Logout"
                    onPress={() => navigation.navigate('Auth')}
                />
            </View>
        </View>

    );
};
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
