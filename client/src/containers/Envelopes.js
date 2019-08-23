import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from '../components/UI/Modal/Modal';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import * as envelopeActions from '../store/actions/evelope';


const Envelopes = props => {


  useEffect(() => {
    props.getEnvelopes()
  }, [])

  const envelopes = for (let envelope in props.envelope) {
    return (
      <p>{props.envelope[envelope]}</p>
    )
  }

  return (
    <div>
      {console.log(props.envelopes)}
    </div>
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes
})

 


const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes);

