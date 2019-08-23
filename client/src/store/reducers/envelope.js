import * as actionTypes from '../actions/actionTypes'

const initialState = {
  // income: 1000,
  // envelopes: {
  //   groceries: 400,
  //   gas: 100,
  //   rent: 880
  // }
}

const envelopeReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_ENVELOPES:
      return {
        ...state,
        envelopes: action.payload
        // envelopes: {
        //   ...state.envelopes,
        //   [action.envelopeName]: state.envelopes[action.envelopeName] - action.amount
        // }
      }
    default:
      return state
  }
}

export default envelopeReducer;