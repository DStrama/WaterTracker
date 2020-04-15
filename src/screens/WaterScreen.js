import React, {useState} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import Spacer from '../components/Spacer';
import { Input, Button } from 'react-native-elements';


const WaterScreen = () => {

    const [water, setWater] = useState('');
    const [drunkWater, setDrunkWater] = useState('');
    const [requiredWater, setRequiredWater] = useState('');

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Spacer/>   
                <Text style = {styles.headerText} >Water</Text>
            </View>
            <Spacer/>
            <Input placeholder='ml' label = "Water"/>
            <Spacer/>
            <Button style = {styles.textAdjacent} title = "Add"/>
            <Spacer/>
            <View >
                <Text style = {styles.textAdjacent} >Drunk water:</Text>
                <Text style = {styles.textAdjacent} >150</Text>
            </View>
            <View>
                <Text style = {styles.textAdjacent} >Required daily water:</Text>
                <Text style = {styles.textAdjacent} >3000</Text>
            </View>
        </View>
    );
};

 const styles = StyleSheet.create({
    container: {
        
    },
    header:{
        padding: 20,
        backgroundColor: '#2289dd',
        justifyContent: "center",
    },
    headerText:{
        color: 'white',
        textAlign: "center",
        fontSize: 20
    },
    buttonStyles:{
        paddingLeft: 50,
        paddingRight: 50,
    },
    textAdjacent:{
        fontSize: 15,
        padding: 15,
        color: '#a4adb6',
        fontWeight: 'bold'
   }
 });

 export default WaterScreen;