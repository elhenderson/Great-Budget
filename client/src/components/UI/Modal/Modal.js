import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {connect} from 'react-redux';
import * as envelopeActions from '../../../store/actions/evelope' 

class Modal extends Component {

  state = {
    amount: 0,
    envelopeName: ''
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  inputChangedHandler = (event, value) => {
    this.setState({
      amount: event.target.value
    })
  }

  dropdownChangedHandler = (envlpName) => {
    this.setState({
      envelopeName: this._onSelect
    })
  }

  render() {

    const envelopesArray = Object.keys(this.props.envlps)
    .map(envlpKey => (
      {value: envlpKey, label: envlpKey.charAt(0).toUpperCase() + envlpKey.slice(1)}
    ))

    let form = (
      <form>
        <Dropdown 
          options={envelopesArray}
          placeholder="Select an envelope"
          onChange={this._onSelect}
          />
        <input type="text" onChange={this.inputChangedHandler}/>
        <button type="submit" onClick={(amount, envelopeName) => this.props.onTransaction()}>Submit</button>
      </form>
    );
  
    return (
      <React.Fragment>
        <Backdrop 
          show={this.props.show}
          clicked={this.props.modalClosed} />
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
          {form}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    envlps: state.envelopes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTransaction: (envlpName, amount) => dispatch(envelopeActions.submitTransaction(envlpName, amount))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal);