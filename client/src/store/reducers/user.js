import {GET_USER, ADD_USER} from '../actions/actionTypes';

const initialState = {}

export default function(state=initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
  };
};