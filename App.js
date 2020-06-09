import React from 'react';
import { createAppContainer } from 'react-navigation';
import {Provider as AuthProvider}  from './src/contex/AuthContex';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import WaterScreen from './src/screens/WaterScreen';
import LoadingApplicationScreen from './src/screens/LodaingApplicationScreen';
import { setNavigation } from './src/navigationRef';
import AuthCheckingScreen from './src/screens/AuthCheckingScreen';


const switchNavigator = createSwitchNavigator({
    authresolve: AuthCheckingScreen,
    authenticationFlow : createSwitchNavigator({
        loadapp: LoadingApplicationScreen,
        signin: SigninScreen,
        signup: SignupScreen
    }),
    mainFlow : createBottomTabNavigator({
        water: {
            screen: WaterScreen,
            navigationOptions: {
                tabBarLabel: "Water",
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require("./src/assets/waterNavBar.png")}
                        style={{ width: 26, height: 26, tintColor: tintColor }}
                    />
                )
            }
        },
        account: {
            screen: AccountScreen,
            navigationOptions: {
                tabBarLabel: "Account",
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require("./src/assets/account.png")}
                        style={{ width: 26, height: 26, tintColor: tintColor }}
                    />
                )
            }
        }
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