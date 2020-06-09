import React, { useContext} from 'react';
import {View, StyleSheet, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { Context as authContext} from '../contex/AuthContex';
import Auth from '../components/Auth';
import {Icon, Text} from "react-native-elements";
import Spacer from "../components/Spacer";

const SigninScreen = ({navigation}) => {

    const {state, signIn, cleanErrorMessage } = useContext(authContext);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
                <View style={styles.addButton}>
                    <TouchableOpacity
                        style={{
                            borderWidth:1,
                            borderColor:'rgba(0,0,0,0)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:50,
                            height:50,
                            backgroundColor:'#363640',
                            borderRadius:50,
                            shadowColor: 'rgba(0,0,0,0.4)', // IOS
                            shadowOffset: { height: 1, width: 1 }, // IOS
                            shadowOpacity: 1, // IOS
                            shadowRadius: 1, //IOS
                            elevation: 2, // Android
                            flexDirection: 'row'
                        }}
                        onPress={ () => {navigation.navigate('loadapp'); cleanErrorMessage()}}
                    >
                        <Icon name={"arrow-back"}  size={30} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems:'center'}}>
                    <Text style={styles.header} h1>Water Track</Text>
                    <Spacer/>
                    <Image source={require('../assets/water.png')} />
                    <Spacer/>
                    <Spacer/>
                    <View style={{width: 340, height: 320, backgroundColor: 'white', borderRadius:30, margin: 20, justifyContent: "center"}} >
                        <Auth
                            errorMessage = {state.errorMessage}
                            onSubmitButton = {signIn}
                            onSubmitButtonTitle = "Sign In"
                        />
                    </View>
            </View>
            </ImageBackground>
        </View>
    );
};

 const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        resizeMode: "cover",
        flex: 1
    },
   image: {
       flex: 1,
       resizeMode: "cover",
       justifyContent: "center",

   },
   header: {
        textAlign: "center",
        color: '#363640',
   },
     addButton: {
         alignItems: 'flex-start',
         margin: 20
     }
 });

 SigninScreen.navigationOptions = () => {
     return {
        headerShown: false
     };
 };

 export default SigninScreen;