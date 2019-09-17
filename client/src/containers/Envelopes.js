import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import {connect} from 'react-redux';
// import Modal from '../components/UI/Modal/Modal';
import * as envelopeActions from '../store/actions/evelope';
import uuidv4 from 'uuid';
import {Form, Field} from 'react-final-form';
import {confirmAlert} from 'react-confirm-alert';
import '../../node_modules/react-confirm-alert/src/react-confirm-alert.css'

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

Modal.defaultStyles.background = 'gray';
Modal.defaultStyles.overlay.background = 'gray';

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


  useEffect(() => {
    initialEnvelopes();
    
  }, [])

  const openModal = (envelopeNameToSet, initialEnvelopeValueToSet) => {
    setEnvelopeName(envelopeNameToSet);
    setInitialEnvelopeValue(initialEnvelopeValueToSet);
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
      [envelopeToChange]: value
    }

    props.editEnvelopes(updatedEnvelopesObj);
    window.location.reload();
  }

  const onDeleteEnvelope = (envelopeToDelete) => {
    const updatedEnvelopesObj = props.envelopes
    confirmAlert({
      title: "Delete Envelope",
      message: "Are you sure you want to delete this envelope?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.deleteEnvelope(updatedEnvelopesObj, envelopeToDelete)
        },
        {
          label: 'No'
        }
      ]
    })
  }

  const renderModal = () => {
    return (
    envelopeName ? 
      <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Edit Envelope"
    >
      <h2>{envelopeName}</h2>
      <Form onSubmit={value => {
        mergeEnvelopeChanges(envelopeName, value.envelopeValue)
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
    :       
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Edit Envelope"
    >
      <h2>Add Envelope</h2>
      <Form onSubmit={values => {
        mergeEnvelopeChanges(values.envelopeName, values.envelopeValue)
      }} >
        {({handleSubmit, pristine, form, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field 
                component={renderField}
                name="envelopeName"
                value={envelopeName}
                onChange = {e => setEnvelopeName(e.target.value)}
              />
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
    </Modal> )
  }

  const renderEnvelopes = () => {
      let envelopesArray = Object.entries(props.envelopes);
      const renderedEnvelopes = envelopesArray.map((envelopeInfo, index) => (
          <p key={uuidv4()}>{envelopeInfo[0]} : {envelopeInfo[1]}
          <button onClick={() => openModal(envelopeInfo[0], envelopeInfo[1])}>Edit</button>
          <button onClick={() => onDeleteEnvelope(envelopeInfo[0])} >Delete</button>
        </p>
      ))

    return renderedEnvelopes;
  }
 
  return (

    <div>
      <h1>My Envelopes</h1>
      <hr />
      {renderEnvelopes()}
      {renderModal()}
      <button onClick={() => openModal()}>Add Envelope</button>
    </div>
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes
})

 


const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes)),
  addEnvelope: (envelope) => dispatch(envelopeActions.addEnvelope(envelope)),
  deleteEnvelope: (envelopeToDelete, value) => dispatch(envelopeActions.deleteEnvelope(envelopeToDelete, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes);

