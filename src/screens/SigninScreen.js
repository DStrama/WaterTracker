import React, { useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as authContext} from '../contex/AuthContex';
import Auth from '../components/Auth';
import TextAction from '../components/TextAction';


const SigninScreen = ({navigation}) => {

    const {state, signIn, cleanErrorMessage } = useContext(authContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={cleanErrorMessage}/>
            <Auth
                headerText = "Water Track"
                errorMessage = {state.errorMessage}
                onSubmitButton = {signIn}
                onSubmitButtonTitle = "Sign In"
            />
            <TextAction
                textBody = "Do not have an account yet? Sign up"
                textNavigation = "signup"
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
        textAlign: "center"
   }
    
 });

 SigninScreen.navigationOptions = () => {
     return {
        headerShown: false
     };
 };

 export default SigninScreen;