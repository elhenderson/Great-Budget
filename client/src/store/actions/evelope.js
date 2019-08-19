import * as actionTypes from './actionTypes';

export const submitTransaction = name => {
  return {
    type: actionTypes.SUBMIT_TRANSACTION,
    envelopeName: name
  }
}