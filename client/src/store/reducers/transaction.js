import * as actionTypes from '../actions/actionTypes';

const initialState = {transacting: false, transfering: false}

const transactionReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.IS_TRANSACTING:
      return {
        ...state,
        transacting: action.payload
      }
    case actionTypes.TRANSFER_FUNDS:
      return {
        ...state,
        transfering: action.payload
      }
    default: 
      return state
  }
}

export default transactionReducer;