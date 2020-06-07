import React, {useContext} from 'react';
import { Context as AuthContex } from '../contex/AuthContex';
import { View, StyleSheet, Text, ImageBackground} from 'react-native';
import Spacer from '../components/Spacer';
import PopUp from '../components/PopUp';
import ProgressCircle from 'react-native-progress-circle'

const WaterScreen = () => {
      
        const {state, howManyWater} = useContext(AuthContex);

        return (
            <View style = {styles.container}>
                <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
                <View style = {styles.circle}>
                    <ProgressCircle
                        percent={state.drunkwater*100/state.requiredwater}
                        radius={100}
                        borderWidth={20}
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff">
                        <Text style={styles.procentText}>{ Math.round(state.drunkwater*100/state.requiredwater) +' %'}</Text>
                    </ProgressCircle>
                </View>
                <Spacer/>
                { state.requiredWaterReachedMessage && Math.round(state.drunkwater*100/state.requiredwater) > 100 ? (<Text style={styles.requiredWaterReachedMessage}>{state.requiredWaterReachedMessage}</Text>) : <View style={{margin: 18}}></View>}
                <Spacer/>
                <View style={{ justifyContent: 'center', alignItems:'center'}}>
                    <View style={styles.whiteWindow} >
                        <View style={{flexDirection: 'row'}}>
                            <Text style = {styles.textAdjacent} >Drunk water: </Text>
                            <Text style = {styles.textAdjacent} >{Math.round(state.drunkwater)} ml</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style = {styles.textAdjacent} >Required daily water: </Text>
                            <Text style = {styles.textAdjacent} >{Math.round(state.requiredwater)} ml</Text>
                        </View>
                    </View>
                </View>
                <Spacer/>
                <PopUp addWater={howManyWater}/>
                </ImageBackground>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1
    },
    buttonStyles: {
        paddingLeft: 50,
        paddingRight: 50,
    },
    textAdjacent: {
        fontSize: 15,
        padding: 15,
        color: '#363640',
        fontWeight: 'bold'
    },
    circle: {
        alignItems: 'center',
        margin: 0
    },
    buttons: {
        flexDirection: "column"
    },
    procentText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#363640'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    requiredWaterReachedMessage: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    whiteWindow: {
        width: 290,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
 });

 export default WaterScreen;