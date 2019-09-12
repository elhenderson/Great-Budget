import * as actionTypes from '../actions/actionTypes'
import { bindActionCreators } from 'redux';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.UPDATE_FORM_STATE:
      return {
        ...state,
        [aciton.form]: action.payload
      }
    default:
      return state;
  }
}