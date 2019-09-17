import React, {useState} from 'react';
import classes from './Toolbar.module.css';
import Transactions from '../../../containers/Transactions';
import { connect } from 'react-redux';
import * as transactionActions from '../../../store/actions/transaction';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const Toolbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const transferToggle = () => {
    props.isTransacting(false);
    props.isTransfering(true);
  }

  const addTransactionToggle = () => {
    props.isTransacting(true);
    props.isTransfering(false);
  }

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    // <div>
    //   <header className={classes.Toolbar}>
    //     <p onClick={() => addTransactionToggle()}>Add Transaction</p>
    //     <p onClick={() => transferToggle()} >Transfer Funds</p>
    //     <p>Fill Envelope</p>
    //   </header>
    //     <Transactions />
    // </div>

    <div>
    <Navbar color="faded" light>
      <NavbarBrand href="/" className="mr-auto">GreatBudget</NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink href="/income" style={{float: "left"}}>Add Income</NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{cursor: "pointer", float: "left"}} onClick={() => addTransactionToggle()}>Add Transaction</NavLink>
          </NavItem>
          <NavItem >
            <NavLink style={{cursor: "pointer", float: "left"}} onClick={() => transferToggle()}>Transfer Funds</NavLink>
          </NavItem>
          <NavItem >
          <NavLink style={{cursor: "pointer", float: "left"}} href="/envelopes">My Envelopes</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    <hr style={{background: "white"}} />
    <Transactions />
  </div>
  )
}

const mapDispatchToProps = dispatch => ({
  isTransacting: (isTransacting) => dispatch(transactionActions.isTransacting(isTransacting)),
  isTransfering: (isTransfering) => dispatch(transactionActions.transferFunds(isTransfering))
})

export default connect(null, mapDispatchToProps)(Toolbar);