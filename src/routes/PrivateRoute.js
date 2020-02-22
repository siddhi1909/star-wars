// // IMPORT EXTERNAL LIBRARIES/MODULES
import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {ReactReduxContext} from "react-redux";
import SimpleCrypto from "simple-crypto-js";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {store} = useContext(ReactReduxContext);
    /* Get user form either store or from localSotrage */
    let _secretKey = "siddhi";
    let simpleCrypto = new SimpleCrypto(_secretKey);
    const userName = store.getState().auth.user || (localStorage.getItem('user')?simpleCrypto.decrypt(localStorage.getItem('user')):'');
    /* If userName is found i.e. if user is logged in then show Component else redirect to login page */
    return (
        <Route {...rest} render={props => (
            userName !== ""
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        )}/>
    )
}

export default PrivateRoute;