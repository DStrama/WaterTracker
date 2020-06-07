import React, {useContext, useEffect} from 'react';
import { Context as authContext} from '../contex/AuthContex';

const AuthCheckingScreen = () => {

    const { isThereToken, isThereAccountData, isThereWater, isThereReachedWaterIntake } = useContext(authContext);

    useEffect( () => {
        isThereToken();
        isThereAccountData();
        isThereWater();
        isThereReachedWaterIntake();
    },[]);

    return null;
};

export default AuthCheckingScreen;
