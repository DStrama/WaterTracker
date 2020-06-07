import React , {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { SegmentedControls } from 'react-native-radio-buttons';
import { Icon } from 'react-native-elements'

const PopUp = ({addWater}) => {

    const [mililiters, setMililiters] = useState(null);
    const [liquid, setLiquid] = useState(null);
    const [popUp, setPopUp] = useState(false);
    
    const options = ['water', 'beer', 'coffee', 'strong alcohol', 'wine', 'tea', 'mineral water'];

    function addLiquid(){
        addWater({mililiters, liquid})
        setPopUp(false)
    }

    return(
        <>
            <View style={styles.container}>
                <Dialog
                    width={350}
                    visible={popUp}
                    footer={
                        <DialogFooter>
                              <DialogButton text="Canel" onPress={() => { setPopUp(false)}} />
                              <DialogButton text="Add" onPress={ () => addLiquid()}/>
                        </DialogFooter>
                    }
                    onTouchOutside={() => { setPopUp(false)}}
                >
                <DialogContent>
                    <View style={{margin: 10}}>
                        <SegmentedControls
                            direction={'column'}
                            options={ options }
                            optionStyle= {{
                                color: '#fff',
                                fontSize: 20,
                            }}
                            containerStyle= {{
                                marginTop: 10,
                                marginLeft: 10,
                                marginRight: 10,
                            }}
                            onSelection={setLiquid}
                            selectedOption={liquid}
                        />
                        <Input placeholder='ml' style={{color:'#325FDC'}} onChangeText={ text => setMililiters(text)}/>
                    </View>
                </DialogContent>
                </Dialog>
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
                        onPress={ () => { setPopUp(true) }}
                    >
                        <Icon name={"add"}  size={30} color='white' />
                    </TouchableOpacity>
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