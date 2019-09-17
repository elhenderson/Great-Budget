import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout';
import {withCookies} from 'react-cookie';
import {Route, Switch} from 'react-router-dom';
import Landing from "./containers/Landing/Landing";
import Envelopes from './containers/Envelopes';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Transactions from './containers/Transactions';
import Income from './containers/Income';
import {ToastContainer} from 'react-toastify'
import '../node_modules/react-toastify/dist/ReactToastify.min.css'
import '../node_modules/bootswatch/dist/darkly/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/landing" render={() => <Landing cookies={this.props.cookies} />}/>
            <Route path="/register" render={() => <Register cookies={this.props.cookies} />}/>
            <Route path='/envelopes' render={() => <Envelopes cookies={this.props.cookies} />}/>
            <Route path="/" render={() => <Login cookies={this.props.cookies} />} />
            <Route path="/transactions" render={() => <Transactions cookies={this.props.cookies} />} />
            <Route path="/income" render={() => <Income cookies={this.props.cookies} />} />
          </Switch>
          <ToastContainer />
        </Layout>
      <div id="modal-root" ></div>
      </div>
    );
  }
}

export default withCookies(App);
