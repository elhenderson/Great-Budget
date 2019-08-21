import axios from 'axios';
import {GET_USER, ADD_USER} from './actionTypes';

export const getUser = (user) => dispatch => {
  axios
  .post('/api/user/login', user)
  .then(res => 
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  );
};

export const addUser = (user) => dispatch => {
  axios
  .post('/api/user', user)
  .then(res => 
    dispatch({
      type: ADD_USER,
      payload: res.data
    })
  );
};