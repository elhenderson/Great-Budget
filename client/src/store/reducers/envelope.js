import * as actionTypes from '../actions/actionTypes'

const initialState = {envelopes: {}}

const envelopeReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_ENVELOPES:
      return {
        ...state,
        envelopes: action.payload
      }
    case actionTypes.EDIT_ENVELOPES:
      return {
        ...state
      }
    case actionTypes.ADD_ENVELOPE:
      return {
        ...state
      }
    case actionTypes.DELETE_ENVELOPE:
      return {
        ...state
      }
    default:
      return state
  }
}

export default envelopeReducer;