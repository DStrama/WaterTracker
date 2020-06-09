import { Text, Input } from 'react-native-elements';
import React , {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Spacer from '../components/Spacer';

const Auth = ({ errorMessage, onSubmitButton, onSubmitButtonTitle }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
            <View style={styles.content}>
                <Input
                    label='Email'
                    placeholder='Enter your address email'
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize= "none"
                    autoCorrect={false}
                />
                <Spacer/>
                <Input
                    style={styles.inputButton}
                    label='Password'
                    placeholder='Enter your Password'
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize= "none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                { errorMessage ? (<Text style={styles.errorMessage}>{errorMessage}</Text>) : <View style={{margin: 18}}></View>}
                <View style={{alignItems: 'center', margin:5}}>
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
                        onPress = { () => onSubmitButton({email,password})}
                    >
                        <Text style={{ color: 'white', fontSize: 23 }}>{onSubmitButtonTitle}</Text>
                    </TouchableOpacity>
                    </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage:{
        color: 'red',
        fontSize: 13,
        margin: 10
    },
    content:{
        paddingTop: 10,
        marginTop: 10,
        marginRight: 30,
        marginLeft: 30,
    },
    button: {
        marginRight: 50,
        marginLeft: 50,
    },
    inputButton:{
        color: '#fff'
    }
  });

export default Auth;