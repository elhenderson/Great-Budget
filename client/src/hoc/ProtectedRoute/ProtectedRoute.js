import React from 'react';
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie'
import {toast} from 'react-toastify'

const cookies = new Cookies();

const ProtectedRoute = ({component: Component, ...props}) => (
    cookies.get('token') ?  <Route path={props.path} render={() => <Component {...props} />} /> : <Redirect to={{pathname: '/', state: {from: props.location, unauthorized: true}}} />
  
);

export default ProtectedRoute;
