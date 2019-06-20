import React, {Component} from 'react';
import {connect} from 'react-redux';
import Envelope from '../components/Envelope';
import Modal from '../components/UI/Modal/Modal';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';

class Envelopes extends Component {
  state = {
    transacting: false
  }

  transactionHandler = () => {
    this.setState({transacting: true})
  }

  transactionCancelledHandler = () => {
    this.setState({transacting: false})
  }

  loadEnvelopes (envelopes) {
    const envelopesArray = Object.keys(envelopes)
      .map(envlpKey => (
        `${envlpKey}: ${envelopes[envlpKey]}`
      ))
    return envelopesArray
  }

  render() {
    return (
      <div>
        <Toolbar clicked={this.transactionHandler}/>
        <Envelope 
          cashFlow={this.props.cashFlow}
          envelopes={this.loadEnvelopes(this.props.envlps)} />
        <Modal 
          show={this.state.transacting}
          modalClosed={this.transactionCancelledHandler}>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cashFlow: state.income,
    envlps: state.envelopes
  }
}

export default connect(mapStateToProps)(Envelopes);

