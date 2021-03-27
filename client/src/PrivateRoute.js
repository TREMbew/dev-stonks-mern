import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const isLoading = useSelector(state => state.auth.loading)
    return (
        <div>
            <Route {...rest} render={props => !isAuthenticated && !isLoading ?  <Redirect to='/login' /> : <Component {...props} />} />
        </div>
    )
}

export default PrivateRoute