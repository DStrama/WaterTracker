import { ButtonGroup, Input } from 'react-native-elements';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Switch, TouchableOpacity} from 'react-native';
import { Context as AuthContex } from '../contex/AuthContex';
import Spacer from '../components/Spacer';
import { Slider } from 'react-native'

const UserData = ({}) => {

    const { state, saveData, changeRequiredWater} = useContext(AuthContex)

    const [gender, setGender] = useState('');
    const [genderIndex, setGenderIndex] = useState(null);
    const [weight, setWeight] = useState(null);
    const [physicalActivity, setPhysicalActivity] = useState(false);

    const toggleSwitch = () => setPhysicalActivity(previousState => !previousState);

    const buttons = ['female', 'male'];

    function updateGender(value){
        if( value === 0){
            setGenderIndex(value)
            setGender('female');
        }
        else{
            setGenderIndex(value)
            setGender('male');
        }
    }
      
    return (
        <>
            <View style = {styles.container}>
                <View>
                    <Text style={styles.genderText}>Gender</Text>
                    <View style = {styles.buttonGroup}>
                        <ButtonGroup
                            onPress={ value => updateGender(value)}
                            selectedIndex={genderIndex}
                            buttons={buttons}
                            containerStyle={{
                                height: 50,
                                width: 200,
                                borderColor: '#74f3c3',
                                shadowColor: '#74f3c3',
                                borderRadius: 20,
                                backgroundColor:'#fff'
                            }}
                            vertical={true}
                            innerBorderStyle={{
                                color: '#74f3c3',
                                borderRadius: 20
                            }}
                            buttonStyle={{
                                backgroundColor: 'white',
                                borderColor: '#74f3c3',

                            }}
                            selectedButtonStyle={{
                                backgroundColor: '#74f3c3',
                                borderColor: '#74f3c3'
                            }}
                            selectedTextStyle={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                            textStyle={{
                                color: '#74f3c3',
                                fontWeight: 'bold'
                            }}
                        />
                    </View>
                    <Text style={styles.textAdjacent}>Weight</Text>
                    <View style = {styles.spacerMini}>
                        <Input
                            placeholder='Kg'
                            value={weight}
                            onChangeText={setWeight}
                        />
                    </View>
                    { state.invalidInputDataMessage ? (<Text style={{color: 'red', marginLeft: 30, marginTop: 5}}>{state.invalidInputDataMessage}</Text>) : <View style={{margin: 5}}></View>}
                    <Spacer/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textAdjacent}>Physical Acitvity</Text>
                        <Spacer/>
                        <Switch
                            style={{marginTop: 3}}
                            trackColor={{ false: "#767577", true: "#74f3c3" }}
                            thumbColor={physicalActivity ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#363640"
                            onValueChange={toggleSwitch}
                            value={physicalActivity}
                        />
                    </View>
                    <Spacer/>
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
                                backgroundColor:'#363640',
                                borderRadius:25,
                            }}
                            onPress = { () => saveData({gender, weight, physicalActivity})}
                        >
                            <Text style={{color: 'white', fontSize: 23}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <Spacer/>
                    <View style={styles.buttonStyles}>
                        <Slider
                            style={{width: 300, height: 50}}
                            minimumValue={0}
                            maximumValue={10000}
                            minimumTrackTintColor="#74f3c3"
                            maximumTrackTintColor="black"
                            value={state.requiredwater}
                            step={100}
                            onSlidingComplete={ value => changeRequiredWater({value}) }
                        />
                        <Text style={styles.dailyLimit} >Daily Water limit: {isNaN(state.requiredwater) ? 0 : state.requiredwater} ml</Text>
                        { state.sliderMessage ? (<Text style={{color: 'red', marginLeft: 30, marginTop: 5}}>{state.sliderMessage}</Text>) : <View style={{margin: 5}}></View>}
                    </View>
            </View>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1
    },
    textAdjacent:{
         fontSize: 25,
         padding: 5,
         marginLeft: 20,
         color: 'black',
         fontWeight: 'bold'
    },
    buttonStyles:{
        alignItems:'center',
    },
    spacerMini:{
        marginTop: 0,
        marginRight: 200,
        marginLeft: 20
    },
    genderText: {
        marginLeft: 20,
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    },
    buttonGroup: {
        margin: 15,
        alignItems:'center'
    },
    dailyLimit: {
        fontSize: 17,
        color: 'black',
        margin: 20,
        fontWeight: 'bold'
    }
 });

export default UserData;