import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import envelopeReducer from './store/reducers/envelope'

import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import rootReducer from "./store/reducers/index"
import {CookiesProvider, withCookies} from 'react-cookie';

// import Register from './components/Register/Register';


const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();