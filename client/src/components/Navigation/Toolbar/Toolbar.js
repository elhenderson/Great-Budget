import React, {useState} from 'react';
import classes from './Toolbar.module.css';
import AddTransaction from '../../../containers/AddTransaction';
import { connect } from 'react-redux';
import * as transactionActions from '../../../store/actions/transaction';

const Toolbar = (props) => {

  return (
    <div>
      <header className={classes.Toolbar}>
        <p onClick={() => props.isTransacting(true)}>Add Transaction</p>
        <p>Transfer</p>
        <p>Fill Envelope</p>
      </header>
        <AddTransaction />
    </div>

  )
}

const mapDispatchToProps = dispatch => ({
  isTransacting: (isTransacting) => dispatch(transactionActions.isTransacting(isTransacting))
})

export default connect(null, mapDispatchToProps)(Toolbar);