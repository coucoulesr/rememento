import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
    const email = useSelector(state => state.email)

    return (
        <Route {...rest} render={(props) => (
            email ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        )}
        />
    );
}

export default PrivateRoute;