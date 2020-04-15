import  { NavigationActions } from 'react-navigation';

let navigator;

export const setNavigation = (nav) => {
    navigator = nav;
};

export const navigate = (routeName, params) => {
    navigator.dispatch(NavigationActions.navigate({
        routeName,
        params
    }))
};
 