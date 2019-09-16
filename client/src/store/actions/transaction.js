import * as actionTypes from './actionTypes';

export const isTransacting = (isTransacting) => dispatch => {
  dispatch({
    type: actionTypes.IS_TRANSACTING,
    payload: isTransacting
  })
};

export const transferFunds = (isTransfering) => dispatch => {
  dispatch({
    type: actionTypes.TRANSFER_FUNDS,
    payload: isTransfering
  })
}