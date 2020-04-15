
import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext';
import API from '../api/waterServer';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload}
        case 'signup':
            return { errorMessage: '', token: action.payload}
        case 'error_message':
            return { ...state, errorMessage: ''}
        case 'signout':
            return { token: null, errorMessage: ''}
        default: 
            return state;
    }
};

const isThereToken = dispatch => async() => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({ type: 'signin', payload: token})
        navigate('water');
    } else {
        navigate('signin');
    }
}

const cleanErrorMessage = dispatch  => async () =>{
    dispatch({type: 'error_message'});
};

const signUp = (dispatch) => async ({ email, password }) => {
        try {
            const response = await API.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);

            dispatch({ type: 'signup', payload: response.data.token })
            navigate('water');

        } catch (err) {
            dispatch({ 
                type: 'add_error', 
                payload: 'Something went wrong with sign up'
            });
        }
    };


const signIn = (dispatch) => async ({ email, password}) => {
    try {
        const response  = await API.post('/signin', { email, password});
        await AsyncStorage.setItem('token', response.data.token)

        dispatch({ type: 'signin', payload: response.data.token })
        navigate('water')

    } catch(err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        });
    }
};

const signOut = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout'});
    navigate('signin');
};


export const {Provider, Context} = createDataContext(
    authReducer,
    {signIn, signUp, signOut, cleanErrorMessage, isThereToken},
    { token: null, errorMessage: '' }
); 