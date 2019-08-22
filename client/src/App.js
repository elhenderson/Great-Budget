import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout';
import {withCookies} from 'react-cookie';
import {Route, Switch} from 'react-router-dom';
import Landing from "./containers/Landing/Landing";
import Envelopes from './containers/Envelopes';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/landing" render={() => <Landing cookies={this.props.cookies} />}/>
            <Route path="/register" render={() => <Register cookies={this.props.cookies} />}/>
            <Route path='/envelopes' render={() => <Envelopes cookies={this.props.cookies} />}/>
            <Route path="/login" render={() => <Login cookies={this.props.cookies} />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withCookies(App);
