import axios from 'axios';
import {GET_USER, ADD_USER} from './actionTypes';
import {toast} from 'react-toastify';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getUser = (user) => dispatch => {
  axios
  .post('/api/user/login', user)
  .then(res => 
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  )
  .then(res => {
    cookies.set('token', res.payload.token, {path: '/'});
    setTimeout(() => {
      window.location.href = "/envelopes"
    }, 1500)
    toast.success("Login successful!")
  })
  .catch((error) => {
    toast.error("Unable to login")
  })
};

export const addUser = (user) => dispatch => {
  axios
  .post('/api/user/register', user)
  .then(res => 
    dispatch({
      type: ADD_USER,
      payload: res.data
    })
  )
  .then(res => {
    toast.success("Registration successful!")
    setTimeout(() => {
      window.location.href = "/login"
    }, 1500)

  })
  .catch((error) => {
    console.log(error)
    toast.error("Unable to register")
  })
};