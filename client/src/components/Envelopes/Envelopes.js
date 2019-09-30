import React, {useEffect, useState} from 'react';
import Modal from 'react-modal'
import {connect} from 'react-redux';
// import Modal from '../components/UI/Modal/Modal';
import * as envelopeActions from '../../store/actions/evelope';
import uuidv4 from 'uuid';
import {Form, Field} from 'react-final-form';
import {confirmAlert} from 'react-confirm-alert';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons' 
import './Envelopes.scss'
import { toast } from 'react-toastify';
import {Card, CardTitle, Button} from 'reactstrap';
import LoadingComponent from '../UI/LoadingComponent/LoadingComponent';

const renderField = ({
  input,
  label,
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
    loginNotification();
  }, [])

  const loginNotification = () => {
    const prevPage = document.referrer
    if (prevPage.slice(-1) === '/' || prevPage.slice(-1) === '/logout') {
      toast.success("Login successful!")
    }
  }

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
    props.getUnallocated();
  }

  const mergeEnvelopeChanges = (envelopeToChange) => {
    const updatedEnvelopesObj = {
      ...props.envelopes, 
      [envelopeToChange]: "0.00"
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
      contentLabel="Edit Envelope"
    >
      <h2>{envelopeName}</h2>
      <Form onSubmit={value => {
        mergeEnvelopeChanges(envelopeName, value.envelopeValue)
      }} >
        {({handleSubmit, pristine, submitting}) => (
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
      contentLabel="Edit Envelope"
    >
      <h2>Add Envelope</h2>
      <Form onSubmit={values => {
        mergeEnvelopeChanges(values.envelopeName)
      }} >
        {({handleSubmit, pristine, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field 
                component={renderField}
                name="envelopeName"
                value={envelopeName}
                onChange = {e => setEnvelopeName(e.target.value)}
              />
              {/* <Field 
                component={renderField}
                name="envelopeValue"
                value={envelopeValue}
                onChange={e => setEnvelopeValue(e.target.value)}
                placeholder={initialEnvelopeValue}
              /> */}
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
      const renderedEnvelopes = envelopesArray.map((envelopeInfo) => (
        <Card key={uuidv4()} style={{display: "flex", margin: "auto", border: '2px  #668925 solid', flexDirection: 'row'}}>
          <CardTitle>
            <p >{envelopeInfo[0]}</p>
            <p style={{float: 'right'}} >{envelopeInfo[1]}</p>
          </CardTitle>
          {/* <button onClick={() => openModal(envelopeInfo[0], envelopeInfo[1])}>Edit</button> */}
          <Button onClick={() => onDeleteEnvelope(envelopeInfo[0])}>
            <FontAwesomeIcon style={{cursor: "pointer"}} icon={faTrash}  />
          </Button>

        </Card>
      ))

    return renderedEnvelopes;
  }
 
  return (

    <div>
      <h1>My Envelopes</h1>
      <hr />
          {props.unallocated ? <h5>Unallocated: {props.unallocated}</h5> :       <LoadingComponent />}
          <br/>
          {renderEnvelopes()}
          {renderModal()}
          <div>
            <Button onClick={() => openModal()} className="addEnvelope">
              Add Envelope
            </Button>
          </div>

          {/* <FontAwesomeIcon size="6x" icon={faEnvelope} style={{cursor: "pointer"}} onClick={() => openModal()} >Add Envelope</FontAwesomeIcon> */}
    </div>
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes,
  unallocated: state.envelope.unallocated
})

 


const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  getUnallocated: () => dispatch(envelopeActions.getUnallocated()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes)),
  addEnvelope: (envelope) => dispatch(envelopeActions.addEnvelope(envelope)),
  deleteEnvelope: (envelopeToDelete, value) => dispatch(envelopeActions.deleteEnvelope(envelopeToDelete, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes);

