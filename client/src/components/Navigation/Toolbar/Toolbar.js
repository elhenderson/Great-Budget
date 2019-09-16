import React, {useState} from 'react';
import classes from './Toolbar.module.css';
import Transactions from '../../../containers/Transactions';
import { connect } from 'react-redux';
import * as transactionActions from '../../../store/actions/transaction';

const Toolbar = (props) => {

  const transferToggle = () => {
    props.isTransacting(false);
    props.isTransfering(true);
  }

  const addTransactionToggle = () => {
    props.isTransacting(true);
    props.isTransfering(false);
  }

  return (
    <div>
      <header className={classes.Toolbar}>
        <p onClick={() => addTransactionToggle()}>Add Transaction</p>
        <p onClick={() => transferToggle()} >Transfer</p>
        <p>Fill Envelope</p>
      </header>
        <Transactions />
    </div>

  )
}

const mapDispatchToProps = dispatch => ({
  isTransacting: (isTransacting) => dispatch(transactionActions.isTransacting(isTransacting)),
  isTransfering: (isTransfering) => dispatch(transactionActions.transferFunds(isTransfering))
})

export default connect(null, mapDispatchToProps)(Toolbar);