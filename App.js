import React from 'react';
import { createAppContainer } from 'react-navigation';
import {Provider as AuthProvider}  from './src/contex/AuthContex';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import WaterScreen from './src/screens/WaterScreen';
import LoadingApplicationScreen from './src/screens/LodaingApplicationScreen';
import { setNavigation } from './src/navigationRef';
import AuthCheckingScreen from './src/screens/AuthChcekingScreen';


const switchNavigator = createSwitchNavigator({
    authresolve: AuthCheckingScreen,
    authenticationFlow : createSwitchNavigator({
        loadapp: LoadingApplicationScreen,
        signin: SigninScreen,
        signup: SignupScreen
    }),
    mainFlow : createBottomTabNavigator({
        water: WaterScreen,
        account: AccountScreen
    })
  });

const NavigationBetweenScreens = createAppContainer(switchNavigator);

export default class App extends React.Component {

  render(){
    return (
      <AuthProvider>
        <NavigationBetweenScreens ref={ (navigator) => { setNavigation(navigator) }}/>
      </AuthProvider>
    );
  }
}