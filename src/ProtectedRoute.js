import React from 'react';
import {Route, Redirect} from 'react-router-dom';
//Redirect works like Link to change routes (logical level)

const ProtectedReact = ({ children, auth}) => {
    // const history = useHistory();

    if(auth) {
        return <Route> {children}</Route>
        // return history.push('/todoListPage');
    }
    else {
        return <Redirect to="/auth" />
        // return history.push('/auth');
    }
    //* or in functional base write a function using useHistory
};

export default ProtectedReact;