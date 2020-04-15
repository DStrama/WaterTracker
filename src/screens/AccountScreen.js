import React,{useState, useContext} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import Spacer from '../components/Spacer';
import { Input, Button} from 'react-native-elements';
import { Context as AuthContex } from '../contex/AuthContex';

const AccountScreen = () => {

    const { signOut } = useContext(AuthContex)

    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [phisicalActivity, setPhisicalActivity] = useState('');
    const [dailyWaterLimit, setDailyWaterLimit] = useState('');

    return (
        <>
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Spacer/>   
                    <Text style = {styles.headerText}>User Data</Text>
                </View>
            <Spacer/>
            <Input placeholder='kg' label = "Weight" value={weight} onChangeText={newWeight => setWeight(newWeight)}/>
            <Spacer/>
            <Input placeholder='female, male' label = "Gender" value={gender} onChangeText={ newGender => setGender(newGender)}/>
            <Spacer/>
            <Input placeholder='true, false' label = "Phisical Acitvity" value={phisicalActivity} onChangeText={ newPhisicalAcitvity => setPhisicalActivity(newPhisicalAcitvity)}/>
            <Spacer/>
            <Button style = {styles.buttonStyles} title = "Save"/>
            <Spacer/>
            <Input placeholder='ml' label = "Daily Water limit" value={dailyWaterLimit} onChangeText={ newDailyWaterLimit => setDailyWaterLimit(newDailyWaterLimit)}/>
            <Spacer/>
            <Button style = {styles.buttonStyles} title = "Sign Out" onPress = {signOut}/>
            </View>
        </>
    );
};

 const styles = StyleSheet.create({
    container: {
        
    },
    header:{
        padding: 15,
        backgroundColor: '#2289dd',
        justifyContent: "center",
    },
    headerText:{
        color: 'white',
        textAlign: "center",
        fontSize: 20
    },
    textAdjacent:{
         fontSize: 15,
         padding: 15,
         color: '#a4adb6',
         fontWeight: 'bold'
    },
    buttonStyles:{
        paddingLeft: 50,
        paddingRight: 50,
    }
 });

 export default AccountScreen;