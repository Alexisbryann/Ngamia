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

    constructor() {
        super();
        this.state = {
            dataSource: [],
        };
    }

    _renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text>{item.jobs.newJobs}</Text>
                <Text>{item.jobs.newJobs}</Text>
                <Image style={{ width: 50, height: 50 }}
                    source={{ uri: item.jobs.newJobs.imageUrl }} />

            </View>
        );
    }

    componentDidMount() {
        async () => {
            try {
                const dealerID = await (await AsyncStorage.getItem('dealerID'));
                const token = await (await AsyncStorage.getItem('token'));

                fetch(jobsApi, {
                    method: 'post',
                    headers: new Headers({
                        'Authorization': token,
                    }),
                    body: dealerID,
                }
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            dataSource: responseJson.jobs,
                        });
                    }));
            }
            catch (error) {
                console.log(error.message);
            }
        };

    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
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

