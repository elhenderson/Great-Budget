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

export const editEnvelopes = (envelopes) => dispatch => {
  axios
  .put('/api/envelopes', {envelopes})
}