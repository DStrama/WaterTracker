import React from 'react';
import {StyleSheet, Text} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'

const TextAction = ({ textBody, textNavigation, navigation }) => {
    return(
        <>
            <TouchableOpacity onPress={ () => navigation.navigate(textNavigation)}>
                <Text style = {styles.textAdjacent}>{textBody}</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    textAdjacent:{
        fontSize: 15,
        padding: 15,
        color: '#a4adb6',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default TextAction;
