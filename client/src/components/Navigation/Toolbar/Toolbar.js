import React, {useState} from 'react';
import Transactions from '../../Transactions/Transactions';
import { connect } from 'react-redux';
import * as transactionActions from '../../../store/actions/transaction';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import Cookies from 'universal-cookie';
import {withRouter} from 'react-router-dom';
import './Toolbar.scss'

const Toolbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const cookies = new Cookies();

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

  const logout = () => {
    cookies.remove("token");
    window.location.href = "/logout"
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
    <Navbar light expand="md">
      <NavbarBrand className="mr-auto">GreatBudget</NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink href="/income" style={{}}>Add Income</NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{cursor: "pointer" }} onClick={() => addTransactionToggle()}>Add Transaction</NavLink>
          </NavItem>
          <NavItem >
            <NavLink style={{cursor: "pointer" }} onClick={() => transferToggle()}>Transfer Funds</NavLink>
          </NavItem>
          <NavItem >
            <NavLink style={{cursor: "pointer" }} href="/envelopes">My Envelopes</NavLink>
          </NavItem>
          <NavItem >
            <NavLink style={{cursor: "pointer" }} onClick={() => logout()}>Log out</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    <Transactions />
  </div>
  )
}

const mapDispatchToProps = dispatch => ({
  isTransacting: (isTransacting) => dispatch(transactionActions.isTransacting(isTransacting)),
  isTransfering: (isTransfering) => dispatch(transactionActions.transferFunds(isTransfering))
})

export default connect(null, mapDispatchToProps)(withRouter(Toolbar));