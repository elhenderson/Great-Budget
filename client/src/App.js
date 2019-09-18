import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout';
import {withCookies} from 'react-cookie';
import {Route, Switch} from 'react-router-dom';
// import Landing from "./containers/Landing/Landing";
import Envelopes from './components/Envelopes';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Transactions from './components/Transactions';
import Income from './components/Income';
import {ToastContainer} from 'react-toastify'
import '../node_modules/react-toastify/dist/ReactToastify.min.css'
import '../node_modules/bootswatch/dist/darkly/bootstrap.min.css'
import ProtectedRoute from './hoc/ProtectedRoute/ProtectedRoute'

class App extends Component {
  render() {
    return (
      <div className="App">

          <Switch>
            <Route path="/" exact render={() => <Login cookies={this.props.cookies} />} />
            <Route path="/register" render={() => <Register cookies={this.props.cookies} />}/>
            <Layout>
              <ProtectedRoute path='/envelopes' component={Envelopes} />
              <ProtectedRoute path='/transactions' component={Transactions} />
              <ProtectedRoute path='/income' component={Income} />
            </Layout>
          </Switch>
          <ToastContainer />

      <div id="modal-root" ></div>
      </div>
    );
  }
}

export default withCookies(App);
