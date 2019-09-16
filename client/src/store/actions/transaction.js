import * as actionTypes from './actionTypes';

export const isTransacting = (isTransacting) => dispatch => {
  dispatch({
    type: actionTypes.IS_TRANSACTING,
    payload: isTransacting
  })
};