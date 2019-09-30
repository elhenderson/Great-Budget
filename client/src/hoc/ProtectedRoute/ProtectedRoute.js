import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const ProtectedRoute = ({component: Component, ...props}) => (
    cookies.get('token') ?  <Route path={props.path} render={() => <Component {...props} />} /> : <Redirect to={{pathname: '/', state: {from: props.location, unauthorized: true}}} />
  
);

export default ProtectedRoute;
