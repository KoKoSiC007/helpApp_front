import React from "react";
import {Redirect, Route} from "react-router-dom";


export default function PrivateRoute({comp, ...rest}: any) {
    var isAuthenticated = !!localStorage.getItem('token')
    if (isAuthenticated){
        return <Route {...rest}>{comp}</Route>
    }else{
        return <Redirect to="/"/>
    }
}
