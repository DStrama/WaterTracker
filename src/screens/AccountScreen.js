import React,{useState, useContext} from 'react';
import { View, StyleSheet, Text, Switch} from 'react-native';
import Spacer from '../components/Spacer';
import { Input, Button, Header, ButtonGroup} from 'react-native-elements';
import { Context as AuthContex } from '../contex/AuthContex';
import * as Progress from 'react-native-progress';

const AccountScreen = () => {

    const { signOut } = useContext(AuthContex)
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [phisicalActivity, setPhisicalActivity] = useState('');
    const [dailyWaterLimit, setDailyWaterLimit] = useState('');
    const [selectedIndex, setSelectedIndex] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const buttons = ['Male', 'Female']


    return (
        <>
                <View style = {styles.container}>
                <Header centerComponent={{ text: 'User Data', style: { color: '#fff' } }}/>
                <Spacer/>
                <Input style = {styles.buttonStyles}  placeholder='kg' label = "Weight" value={weight} onChangeText={newWeight => setWeight(newWeight)}/>
                <Spacer/>
                <Text style={styles.textAdjacent}>Gender</Text>
                <Spacer/>
                <ButtonGroup
                onPress={selectedIndex => this.setSelectedIndex(selectedIndex)}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 40, width: 140}}
                />
                <Spacer/>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.textAdjacent}>Phisical Acitvity</Text>
                <Spacer/>
                <Switch
                    trackColor={{ false: "#767577", true: "#3399FF" }}
                    thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                </View>
                <Spacer/>
                <Button
                style = {styles.buttonStyles} 
                title="Save"
                onPress = {signOut}
                />
                <Spacer/>
                <Text style={styles.textAdjacent} >Daily Water limit</Text>
                <Progress.Bar progress={0.5} width={200} />
                <Spacer/>
                <Button
                style = {styles.buttonStyles} 
                title="Sign Out"
                onPress = {signOut}
                />
                </View>
        </>
    );
};

 const styles = StyleSheet.create({
    container: {
        
    },
    header:{
        backgroundColor: '#2289dd',
        justifyContent: "center",
    },
    headerText:{
        color: 'white',
        textAlign: "center",
        fontSize: 20
    },
    textAdjacent:{
         fontSize: 16,
         padding: 5,
         marginLeft: 5,
         color: '#a4adb6',
         fontWeight: 'bold'
    },
    buttonStyles:{
        paddingLeft: 140,
        paddingRight: 140,
    }
 });

 export default AccountScreen;