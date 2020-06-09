import React, {useContext, useEffect} from 'react';
import { Context as authContext} from '../contex/AuthContex';

const AuthCheckingScreen = () => {

    const { isThereToken, isThereAccountData, isThereWater, isThereReachedWaterIntake, isThereNewDay } = useContext(authContext);

    useEffect( () => {
        isThereToken();
        isThereAccountData();
        isThereWater();
        isThereReachedWaterIntake();
        isThereNewDay();
    },[]);

    return null;
};

export default AuthCheckingScreen;
