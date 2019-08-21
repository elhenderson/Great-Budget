import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import envelopeReducer from './store/reducers/envelope'
import Landing from "./containers/Landing/Landing";
import Envelopes from './containers/Envelopes';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
// import Register from './components/Register/Register';

const rootReducer = combineReducers({
  envelope: envelopeReducer,
  form: formReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store} >
    <Router>
      <Route path="/" component={App} />
      <Route path="/landing" component={Landing}/>
      <Route path="/register" component={Register}/>
      <Route path='/envelopes' component={Envelopes}/>
      <Route path="/login" component={Login} />
    </Router>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
