import * as actionTypes from './actionTypes';

export const updateFormState = (form, state) => ({
  type: actionTypes.UPDATE_FORM_STATE,
  form,
  payload: state
})