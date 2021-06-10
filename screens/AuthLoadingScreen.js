/* eslint-disable prettier/prettier */
import React from 'react';

import {
    View,
    ActivityIndicator,
    StyleSheet,

} from 'react-native';

const AuthLoadingScreen = () => {

    return (
        <View style={[styles.container]}>
            <ActivityIndicator size="large" color="#6b471c" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // horizontal: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     padding: 10,
    // },
});
export default AuthLoadingScreen;
