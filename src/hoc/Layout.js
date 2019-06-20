import React, {Component} from 'react';
// import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component {


  render() {
    return (
      <React.Fragment>
        {/* <Toolbar clicked={this.toggle}/> */}
        <main className={classes.Component}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}

export default Layout;