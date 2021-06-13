/* eslint-disable prettier/prettier */
import React from 'react';
import DashboardScreen from './screens/DashboardScreen';
import AppContainer from './routes';
import LoginScreen from './screens/LoginScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

class App extends React.Component  {
    render(){
    return (
        <AppContainer />
    );
}
}

export default App;
