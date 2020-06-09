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
        case 'selectedOption':
            return { ...state, option: action.payload}
        case 'water':
            return { ...state, water: action.payload}
        case 'weight':
            return { ...state, weight: action.payload}
        case 'physicalActivity':
            return { ...state, physicalActivity: action.payload}
        case 'requiredwater':
            return { ...state, requiredwater: action.payload}
        case 'drunkwater':
            return { ...state, drunkwater: action.payload}
        case 'requiredWaterReachedMessage':
            return {... state, requiredWaterReachedMessage: action.payload}
        case 'cleanRequiredWaterReachedMessage':
            return {... state, requiredWaterReachedMessage: ''}
        case 'dataId':
            return { ...state, dataId: action.payload}
        case 'addDataError':
            return { ...state, invalidInputDataMessage: action.payload}
        case 'addWaterError':
            return { ...state, invalidInputAddWaterMessage: action.payload}
        case 'changePopUpVisible':
            return { ...state, visiblePopUp: action.payload}
        case 'sliderError':
            return { ...state, sliderMessage: action.payload}
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
        navigate('loadapp');
    }
}

const isThereAccountData = dispatch => async() => {
    const dailyWaterLimit = await AsyncStorage.getItem('requiredwater');
    if(dailyWaterLimit !== 0){
        dispatch({ type: 'requiredwater', payload: dailyWaterLimit});
    } else {
        navigate('account');
    }
}

const isThereWater = dispatch => async() => {
    const drunkwater = await AsyncStorage.getItem('drunkwater');
    if(drunkwater  != 0){
        dispatch({ type: 'drunkwater', payload: drunkwater});
    }
}

const isThereReachedWaterIntake = dispatch => async() => {
    const requiredWaterReachedMessage = await AsyncStorage.getItem('requiredWaterReachedMessage');
    if(requiredWaterReachedMessage != '') {
        dispatch({ type: 'requiredWaterReachedMessage', payload: requiredWaterReachedMessage});
    }
}

const isThereNewDay = dispatch => async() => {
    const savedDate = await AsyncStorage.getItem('date');
    const date = new Date(Date.now()).toLocaleString().split(',')[0];

    if(date != savedDate){
        dispatch({ type: 'drunkwater', payload: 0 });
    }
}

const cleanErrorMessage = dispatch  => async () => {
    dispatch({type: 'error_message'});
};

const cleanRequiredWaterReachedMessage = dispatch  => async () => {
    dispatch({type: 'cleanRequiredWaterReachedMessage'});
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
        const token = response.data.token;
        const date = new Date(Date.now()).toLocaleString().split(',')[0];

        const getRequiredWater  = await API.get('/data',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('requiredwater', String(getRequiredWater.data[ getRequiredWater.data.length - 1 ].userData.requiredwater));

        dispatch({ type: 'signin', payload: token });
        dispatch({ type: 'requiredwater', payload: getRequiredWater.data[ getRequiredWater.data.length - 1 ].userData.requiredwater});

        const responseHowManyWater  = await API.get('/water',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
        });

        const water = responseHowManyWater.data.filter( i => i.day.data === date);
        const howManyDrunkLiquid = water.reduce( (sum, current) => sum + current.day.drunkwater, 0 );

        await AsyncStorage.setItem('drunkwater', String(howManyDrunkLiquid));

        if(howManyDrunkLiquid >= getRequiredWater.data[ getRequiredWater.data.length - 1 ].userData.requiredwater ) {
            await AsyncStorage.setItem('requiredWaterReachedMessage', 'Congratulation! \n You reach daily water intake.');
            dispatch({type: 'requiredWaterReachedMessage', payload: 'Congratulation! \n You reach daily water intake.'});
        }

        dispatch({ type: 'drunkwater', payload: howManyDrunkLiquid});


        navigate('water');

    } catch(err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        });
    }
};

const signOut = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('requiredwater');
    await AsyncStorage.removeItem('drunkwater');
    await AsyncStorage.removeItem('requiredWaterReachedMessage');
    await AsyncStorage.removeItem('dataId');
    dispatch({ type: 'signout'});
    navigate('loadapp');
};

const selectedOption = (dispatch) => async ({option}) => {
    dispatch({ type: 'selectedOption', payload: option });
    console.log(option);
}

const howManyWater = (dispatch) => async ({mililiters, liquid}) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const required = await AsyncStorage.getItem('requiredwater');
        const date = new Date(Date.now()).toLocaleString().split(',')[0];
        
            const response  = await API.post('/water', 
            {            
                'day':{
                    'data': date,
                    'drunkwater': mililiters,
                    'liquid': liquid
                }
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            const responseHowManyWater  = await API.get('/water',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            
            const water = responseHowManyWater.data.filter( i => i.day.data == date);
            const howManyDrunkLiquid = water.reduce( (sum, current) => sum + current.day.drunkwater, 0 );

            await AsyncStorage.setItem('drunkwater', String(howManyDrunkLiquid));
            await AsyncStorage.setItem('date', String(date));

            if(howManyDrunkLiquid >= required ) {
                await AsyncStorage.setItem('requiredWaterReachedMessage', 'Congratulation! \n You reach daily water intake.');
                dispatch({type: 'requiredWaterReachedMessage', payload: 'Congratulation! \n You reach daily water intake.'});
            }

            dispatch({ type: 'drunkwater', payload: howManyDrunkLiquid});
            dispatch({ type: 'addWaterError', payload: ''});
} catch(err) {
    console.log(err);
    dispatch({
        type: 'addWaterError',
        payload: 'Failed to add value'
    });

}

}
const saveData = (dispatch) => async ({gender, weight, physicalActivity}) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response  = await API.post('/data', 
        {            
            'userData':{
                'sex': gender,
                'weight': weight,
                'physicalactivity': physicalActivity
            }
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
          });
        await AsyncStorage.setItem('requiredwater', String(response.data.userData.requiredwater));
        await AsyncStorage.setItem('dataId', String(response.data._id));

        dispatch({ type: 'dataId', payload: response.data._id});
        dispatch({ type: 'requiredwater', payload: response.data.userData.requiredwater});
        dispatch({ type: 'addDataError', payload: ''});
        dispatch({ type: 'sliderError', payload: ''});
    } catch(err) {
        console.log(err);
        dispatch({
            type: 'addDataError',
            payload: 'Invalid input'
        });
    }
}

const changeRequiredWater = (dispatch) => async ({value}) => {
    try {
        const id = await AsyncStorage.getItem('dataId');
        const token = await AsyncStorage.getItem('token' );

        console.log(value);

        const response  = await API.put('/data/' + id,
            {
                'userData':{
                    "requiredwater": value
                }
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

        await AsyncStorage.setItem('requiredwater', String(response.data.userData.requiredwater));
        dispatch({ type: 'requiredwater', payload: response.data.userData.requiredwater});
        dispatch({ type: 'sliderError', payload: ''});
    } catch(err) {
        console.log(err);
        dispatch({
            type: 'sliderError',
            payload: 'Error, set data first'
        });
    }

}

const changePopUpVisible = dispatch => async () => {
    const visible = await AsyncStorage.getItem('visiblePopUp');
    dispatch({ type: 'changePopUpVisible', payload: !visible });
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {
        signIn,
        signUp,
        signOut,
        cleanErrorMessage,
        isThereToken,
        isThereAccountData,
        isThereWater,
        selectedOption,
        howManyWater,
        saveData,
        cleanRequiredWaterReachedMessage,
        isThereReachedWaterIntake,
        changeRequiredWater,
        changePopUpVisible,
        isThereNewDay
    },
    {
        token: null,
        requiredwater: 0,
        dataId: null,
        date: '',
        drunkwater: 0,
        water: 0,
        errorMessage: '',
        option: '',
        requiredWaterReachedMessage: '',
        invalidInputDataMessage: '',
        invalidInputAddWaterMessage: '',
        sliderMessage: '',
        visiblePopUp: false
    }
); 