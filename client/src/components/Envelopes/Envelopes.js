import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as envelopeActions from '../../store/actions/evelope';
import uuidv4 from 'uuid';
import {confirmAlert} from 'react-confirm-alert';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons' 
import './Envelopes.scss'
import { toast } from 'react-toastify';
import {Button, Container, Row, Col} from 'reactstrap';
import LoadingComponent from '../UI/LoadingComponent/LoadingComponent';
import AddEnvModal from './AddEnvModal';


const Envelopes = ({
  getEnvelopes, 
  getUnallocated,
  editEnvelopes,
  deleteEnvelope,
  envelopes,
  unallocated
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [envelopeName, setEnvelopeName] = useState();

  useEffect(() => {
    getEnvelopes();
    getUnallocated();
    loginNotification();
  }, [getEnvelopes, getUnallocated])

  const loginNotification = () => {
    const prevPage = document.referrer
    if (prevPage.slice(-1) === '/' || prevPage.slice(-1) === '/logout') {
      toast.success("Login successful!")
    }
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const mergeEnvelopeChanges = (envelopeToChange) => {
    if (envelopes[envelopeToChange]) {
      toast.error("Unable to add duplicate envelopes");
      return
    }

    const updatedEnvelopesObj = {
      ...envelopes, 
      [envelopeToChange]: "0.00"
    }

    editEnvelopes(updatedEnvelopesObj);
    getEnvelopes();
    closeModal();
    toast.success("Envelope added!")
    // window.location.reload();
  }

  const onDeleteEnvelope = (envelopeToDelete) => {
    const updatedEnvelopesObj = envelopes
    confirmAlert({
      title: "Delete Envelope",
      message: "Are you sure you want to delete this envelope?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteEnvelope(updatedEnvelopesObj, envelopeToDelete)
        },
        {
          label: 'No'
        }
      ]
    })
  }

  const renderModal = () => {
    return (
      <AddEnvModal 
        modalIsOpen={modalIsOpen}
        mergeEnvelopeChanges={mergeEnvelopeChanges}
        closeModal={closeModal}
        setEnvelopeName={setEnvelopeName}
        envelopeName={envelopeName}
      /> 
    )
  }

  const renderEnvelopes = () => {
      let envelopesArray = Object.entries(envelopes);
      const renderedEnvelopes = envelopesArray.map((envelopeInfo) => (
        <Row key={uuidv4()} style={{display: "flex", margin: "auto", border: '2px  #668925 solid', flexDirection: 'row'}}>
          <Col xs="6">
            <p >{envelopeInfo[0]}</p>
          </Col>
          <Col>
            <p style={{float: 'right'}} >{envelopeInfo[1]}</p>
          </Col>
          <Col>
            <Button onClick={() => onDeleteEnvelope(envelopeInfo[0])}>
              <FontAwesomeIcon style={{cursor: "pointer"}} icon={faTrash}  />
            </Button>
          </Col>
        </Row>
      ))

    return renderedEnvelopes;
  }
 
  return (

    <div>
      <h1>My Envelopes</h1>
      <hr />
          {unallocated ? <h5>Unallocated: {unallocated}</h5> :       <LoadingComponent />}
          <br/>
          <Container >
            {renderEnvelopes()}
          </Container>
          {renderModal()}
          <div>
            <Button onClick={() => openModal()} className="addEnvelope">
              Add Envelope
            </Button>
          </div>
    </div>
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes,
  unallocated: state.envelope.unallocated
})

 


const mapDispatchToProps= dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  getUnallocated: () => dispatch(envelopeActions.getUnallocated()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes)),
  addEnvelope: (envelope) => dispatch(envelopeActions.addEnvelope(envelope)),
  deleteEnvelope: (envelopeToDelete, value) => dispatch(envelopeActions.deleteEnvelope(envelopeToDelete, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes);

