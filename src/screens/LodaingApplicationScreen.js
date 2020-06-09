import React from 'react';
import {View, StyleSheet, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import Spacer from '../components/Spacer';

const LoadApplicationScreen = ({navigation}) => {

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
                <View style={{ justifyContent: 'center', alignItems:'center'}}>
                <Text style={styles.header}>Water Tracker</Text>
                <Spacer/>
                <Image source={require('../assets/water.png')} />
                <Spacer/>
                <Spacer/>
                <Spacer/>
                    <View style={{width: 340, height: 200, backgroundColor: 'white', borderRadius:30, justifyContent: 'center', alignItems:'center'}} >
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0)',
                                alignItems:'center',
                                justifyContent:'center',
                                width:200,
                                height:50,
                                backgroundColor:'#363640',
                                borderRadius:25,
                            }}
                            onPress={ () => navigation.navigate('signin')}
                        >
                            <Text style={{ color: 'white', fontSize: 23 }}>Login</Text>
                        </TouchableOpacity>
                        <Spacer/>
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0)',
                                alignItems:'center',
                                justifyContent:'center',
                                width:200,
                                height:50,
                                backgroundColor:'#74f3c3',
                                borderRadius:25,
                            }}
                            onPress = { () => navigation.navigate('signup')}
                        >
                            <Text style={{ color: 'white', fontSize: 23 }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    header: {
        textAlign: "center",
        color: '#363640',
        fontSize: 50
    }
});

export default LoadApplicationScreen;