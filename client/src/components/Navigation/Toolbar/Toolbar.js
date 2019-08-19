import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <p onClick={props.clicked}>Add Transaction</p>
    <p>Transfer</p>
    <p>Fill Envelope</p>
  </header>
)

export default toolbar;