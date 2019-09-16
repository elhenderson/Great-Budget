import * as actionTypes from '../actions/actionTypes';

const initialState = {transacting: false}

const transactionReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.IS_TRANSACTING:
      return {
        ...state,
        transacting: action.payload
      }
    default: 
      return state
  }
}

export default transactionReducer;