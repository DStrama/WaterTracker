import React, { useContext } from 'react';
import { View, StyleSheet} from 'react-native';
import { Context as authContext} from '../contex/AuthContex';
import Auth from '../components/Auth';
import TextAction from '../components/TextAction';
import {NavigationEvents} from 'react-navigation';

const SignupScreen = ({navigation}) => {

    const {state, signUp, cleanErrorMessage} = useContext(authContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onDidBlur={cleanErrorMessage}/>
            <Auth
                headerText = "Water Track"
                errorMessage = {state.errorMessage}
                onSubmitButton = {signUp}
                onSubmitButtonTitle = "Sign Up"
            />
            <TextAction
                textBody = "Go to signin"
                textNavigation = "signin"
                navigation = {navigation}
            />
        </View>
    );
};

 const styles = StyleSheet.create({
    container:{
        marginBottom: 150,
        justifyContent: "center",
        flex: 1

    },
    header:{
        textAlign: "center"
    },
    textAdjacent:{
        fontSize: 15,
        padding: 15,
        color: '#a4adb6',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorMessage:{
        color: 'red',
        fontSize: 16,
        marginLeft: 15
    }
  });

  SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
  };

 export default SignupScreen;

 