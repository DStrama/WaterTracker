import React, {useContext, useEffect} from 'react';
import { Context as authContext} from '../contex/AuthContex';

const AuthCheckingScreen = () => {

    const { isThereToken } = useContext(authContext);

    useEffect( () => {
        isThereToken();
    },[]);

    return null;
};

export default AuthCheckingScreen;
