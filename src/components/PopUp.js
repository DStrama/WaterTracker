import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { ButtonGroup, Input, Overlay } from 'react-native-elements';
import { Icon } from 'react-native-elements'

const PopUp = ({addWater, state}) => {

    const [mililiters, setMililiters] = useState(null);
    const [liquid, setLiquid] = useState(null);
    const [liquidIndex, setLiquidIndex] = useState(null);
    const [visible, setVisible] = useState(false);
    
    const buttons = ['water', 'beer', 'coffee', 'strong alcohol', 'wine', 'tea', 'mineral water'];

    function addLiquid(){
        addWater({mililiters, liquid});
        toggleOverlay();
    }

    function updateLiquid(value){
        setLiquidIndex(value);
        setLiquid(buttons[value]);
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return(
        <>
            <View style={styles.container}>
                <View style={styles.addButton}>
                    <TouchableOpacity
                        style={{
                            borderWidth:1,
                            borderColor:'rgba(0,0,0,0)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:60,
                            height:60,
                            backgroundColor:'#363640',
                            borderRadius:50,
                            shadowColor: 'rgba(0,0,0,0.4)', // IOS
                            shadowOffset: { height: 1, width: 1 }, // IOS
                            shadowOpacity: 1, // IOS
                            shadowRadius: 1, //IOS
                            elevation: 2, // Android
                            flexDirection: 'row',
                        }}
                        onPress={toggleOverlay}
                    >
                        <Icon name={"add"}  size={30} color='white' />
                    </TouchableOpacity>
                    <Overlay overlayStyle={{borderRadius:20, width:340, height:400,}} isVisible={visible} onBackdropPress={toggleOverlay}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <ButtonGroup
                                onPress={ value => updateLiquid(value)}
                                selectedIndex={liquidIndex}
                                buttons={buttons}
                                containerStyle={{
                                    height: 250,
                                    width: 300,
                                    borderColor: '#74f3c3',
                                    shadowColor: '#fff',
                                    borderRadius: 20,
                                    backgroundColor:'#fff',
                                    flexDirection: 'column'
                                }}
                                vertical={true}
                                innerBorderStyle={{
                                    color: '#fff',
                                    borderRadius: 20,
                                    borderColor: '#363640',
                                }}
                                buttonStyle={{
                                    backgroundColor: '#fff',
                                    borderColor: '#363640',

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
                            <Input placeholder='ml' style={{color:'#325FDC', paddingLeft:20}} onChangeText={ text => setMililiters(text)}/>
                            <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                                <TouchableOpacity
                                    style={{
                                        margin:5,
                                        borderWidth:1,
                                        borderColor:'rgba(0,0,0,0)',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:120,
                                        height:50,
                                        backgroundColor:'#363640',
                                        borderRadius:25,
                                    }}
                                    onPress = {toggleOverlay}
                                >
                                    <Text style={{color: 'white', fontSize: 23}}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        margin:5,
                                        borderWidth:1,
                                        borderColor:'rgba(0,0,0,0)',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:120,
                                        height:50,
                                        backgroundColor:'#74f3c3',
                                        borderRadius:25,
                                    }}
                                    onPress={addLiquid}
                                >
                                    <Text style={{color: 'white', fontSize: 23}}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Overlay>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    addButton: {
        alignItems: 'flex-end',
        margin: 10
    }
});

export default PopUp;