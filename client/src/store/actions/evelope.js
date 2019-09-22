import * as actionTypes from './actionTypes';
import axios from 'axios';


export const getEnvelopes = () => dispatch => {
    axios
    .get('/api/envelopes')
    .then(res => 
      dispatch({
        type: actionTypes.GET_ENVELOPES,
        payload: res.data[0]
      })
    );
    // type: actionTypes.SUBMIT_TRANSACTION,
    // envelopeName: name
}

export const getUnallocated = () => dispatch => {
  axios
  .get('/api/envelopes/unallocated')
  .then(res => 
    dispatch({
      type: actionTypes.GET_UNALLOCATED,
      payload: res.data
    })  
  )
}

export const editEnvelopes = (envelopes) => dispatch => {
  axios
  .put('/api/envelopes', {envelopes})
}

export const editUnallocated = (unallocated) => dispatch => {
  console.log(unallocated)
  axios
  .put('/api/envelopes/unallocated', {unallocated})
}

export const addEnvelope = (envelope) => {
  axios.put('/api/envelopes', envelope)
}

export const deleteEnvelope = (envelopes, envelopeToDelete) => dispatch => {
  axios.put('/api/envelopes/delete', {envelopes, envelopeToDelete})
  .then(res => {
    window.location.reload()
    dispatch({
      type: actionTypes.DELETE_ENVELOPE,
      payload: res.data[0]
    })
  })
}