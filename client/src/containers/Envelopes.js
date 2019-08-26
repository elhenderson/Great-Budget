import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from '../components/UI/Modal/Modal';
import * as envelopeActions from '../store/actions/evelope';
import uuidv4 from 'uuid';
// import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import ToggleContent from '../components/UI/ToggleContent/ToggleContent';

const Envelopes = props => {
  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);

  useEffect(() => {
    initialEnvelopes()
  }, [])


  function initialEnvelopes() {
    props.getEnvelopes();
  }


  return (

    <div>
      {props.envelopes.map((envelope) => {
        for (let key in envelope) {
          return (
            <p key={uuidv4()}>{key} : {envelope[key]} 
              <ToggleContent 
                toggle={show => <button onClick={show}>Open</button>}
                content={hide => (
                  <Modal>
                    Hello
                    <button onClick={hide}>Close</button>
                  </Modal>
                )}
              />
            </p>
          )
        }
      })}
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

