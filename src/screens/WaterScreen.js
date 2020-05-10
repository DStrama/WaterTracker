import React, {Component, useContext} from 'react';
import { Context as AuthContex } from '../contex/AuthContex';
import { View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import Spacer from '../components/Spacer';
import { Input, Button, Header } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import Drinks from '../components/Drinks';

const WaterScreen = () => {
      
        const {state, closePopUp, openPopUp, selectedOption, howManyWater} = useContext(AuthContex)

        return (
            <View style = {styles.container}>
                <Header centerComponent={{ text: 'Water', style: { color: '#fff' } }}/>
                <Spacer/>
                <Spacer/>
                <View style = {styles.circle}>
                    <ProgressCircle
                        percent={30}
                        radius={70}
                        borderWidth={15}
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff">
                        <Text style={{ fontSize: 18 }}>{'30%'}</Text>
                    </ProgressCircle>
                </View>
                <Spacer/>
                <Spacer/>
                <Button style = {styles.textAdjacent} title = "Add a drink" onPress={openPopUp}/>
                <Dialog
                    width={300}
                    visible={state.visible}
                    footer={
                        <DialogFooter> 
                          <DialogButton 
                          text="Canel"
                          onPress={closePopUp}
                          />
                          <DialogButton
                          text="Add"
                          onPress={closePopUp}
                          />
                        </DialogFooter>
                    }
                >
                <DialogContent>
                <View style={{margin: 10}}>
                <Drinks selectedOption={selectedOption}/>
                <Text>Selected option: { state.option || 'none'}</Text>
                <Input 
                  placeholder='ml' 
                  style={{color:'#325FDC'}}
                  onChangeText={value => howManyWater({value})}
                />
                <Text>water: { state.water || 'none'}</Text>
                </View>
                </DialogContent>
                </Dialog>
                <Spacer/>
                <View style={{flexDirection: 'row'}}>
                    <Text style = {styles.textAdjacent} >Drunk water:</Text>
                <Text style = {styles.textAdjacent} >{state.water}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style = {styles.textAdjacent} >Required daily water:</Text>
                    <Text style = {styles.textAdjacent} >3000</Text>
                </View>
            </View>
        );
}

 const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    buttonStyles: {
        paddingLeft: 50,
        paddingRight: 50,
    },
    textAdjacent: {
        fontSize: 15,
        padding: 15,
        color: '#a4adb6',
        fontWeight: 'bold'
   },
   circle: {
    alignItems:'center',
    margin: 0
   },
   buttons: {
    flexDirection: "column"
   }
 });

 export default WaterScreen;