import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Spacer from '../components/Spacer';
import { Context as AuthContex } from '../contex/AuthContex';
import UserData from '../components/UserData';

const AccountScreen = () => {

    const { state, signOut} = useContext(AuthContex);

    return (
        <View style = {styles.container}>
            <UserData/>
            <Spacer/>
            <View style={styles.buttonStyles}>
                <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:150,
                        height:50,
                        backgroundColor:'#74f3c3',
                        borderRadius:25,
                    }}
                    onPress = {signOut}
                >
                    <Text style={{ color: 'white', fontSize: 23 }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            <Spacer/>
        </View>
    );
};

 const styles = StyleSheet.create({
    textAdjacent: {
         fontSize: 16,
         padding: 5,
         marginLeft: 20,
         color: '#363640',
         fontWeight: 'bold'
    },
    buttonStyles:{
        alignItems:'center',
    },
    image: {
         flex: 1,
         resizeMode: "cover",
         justifyContent: "center",
    },
    container: {
         justifyContent: "center",
         flex: 1
    },
    progressBar: {
        borderColor: '#74f3c3',
        justifyContent: "center"
    }
 });

 export default AccountScreen;