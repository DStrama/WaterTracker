import { Text, Button, Input } from 'react-native-elements'; 
import React , {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import Spacer from '../components/Spacer';

const Auth = ({ headerText, errorMessage, onSubmitButton, onSubmitButtonTitle }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
            <Spacer>
            <Text style={styles.header} h3>{headerText}</Text>
            </Spacer>
            <Input 
                label='Email'
                placeholder='Enter your address email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize= "none"
                autoCorrect= {false}
                />
            <Spacer/>
            <Input 
                label='Password'
                placeholder='Enter your Password'
                value={password}
                onChangeText={setPassword}
                autoCapitalize= "none"
                autoCorrect= {false}
                secureTextEntry={true}
                />
            <Spacer/>
                { errorMessage ? (<Text style={styles.errorMessage}>{errorMessage}</Text>) : null}
            <Spacer/>
            <Button title={onSubmitButtonTitle} onPress = { () => onSubmitButton({email,password})} />
            <Spacer/>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage:{
        color: 'red',
        fontSize: 16,
        marginLeft: 15
    },
    header:{
        textAlign: "center"
    }
  });

  export default Auth;