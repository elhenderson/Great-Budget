import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import {connect} from 'react-redux';
// import Modal from '../components/UI/Modal/Modal';
import * as envelopeActions from '../store/actions/evelope';
import uuidv4 from 'uuid';
import {Form, Field} from 'react-final-form';


const modalStyles = {
  content : {
    transition: 'bottom 1s ease-out',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto'
  }
};

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder}  />
      {touched &&
        ((error && <span >{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const Envelopes = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [envelopeValue, setEnvelopeValue] = useState();
  const [envelopeName, setEnvelopeName] = useState();
  const [initialEnvelopeValue, setInitialEnvelopeValue] = useState();
  const [test, setTest] = useState(props.envelopes)

  useEffect(() => {
    initialEnvelopes();
    
  }, [])

  const openModal = (envelopeNameToSet, initalEnvelopeValueToSet) => {
    setEnvelopeName(envelopeNameToSet);
    setInitialEnvelopeValue(initalEnvelopeValueToSet);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  function initialEnvelopes() {
    props.getEnvelopes();
  }

  const mergeEnvelopeChanges = (envelopeToChange, value) => {
    const updatedEnvelopesObj = {
      ...props.envelopes, 
      [envelopeToChange]: value.envelopeValue
    }

    props.editEnvelopes(updatedEnvelopesObj);
    window.location.reload();
  }

  const renderModal = () => (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Edit Envelope"
    >
      <h2>{envelopeName}</h2>
      <Form onSubmit={value => {
        mergeEnvelopeChanges(envelopeName, value)
      }} >
        {({handleSubmit, pristine, form, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field 
                component={renderField}
                name="envelopeValue"
                value={envelopeValue}
                onChange={e => setEnvelopeValue(e.target.value)}
                placeholder={initialEnvelopeValue}
              />
              <button type="submit" disabled={submitting, pristine}>
                Submit
              </button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  )

  const renderEnvelopes = () => {
      let envelopesArray = Object.entries(props.envelopes);
      const renderedEnvelopes = envelopesArray.map((envelopeInfo, index) => (
          <p key={uuidv4()}>{envelopeInfo[0]} : {envelopeInfo[1]}
          <button onClick={() => openModal(envelopeInfo[0], envelopeInfo[1])}>Edit</button>
          {renderModal()}
        </p>
      ))

    return renderedEnvelopes;
  }
 
  return (

    <div>
      {renderEnvelopes()}
      <button onClick={openModal}>Add Envelope</button>
    </div>
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes
})

 


const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes))
})

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes);

