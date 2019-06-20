const initialState = {
  income: 1000,
  envelopes: {
    groceries: 400,
    gas: 100,
    rent: 880
  }
}

const envelopeReducer = (state = initialState, action) => {
  return state
}

export default envelopeReducer;