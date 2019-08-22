
import {combineReducers} from 'redux';
import envelopeReducer from "./envelope";
import userReducer  from "./user"
import {reducer as formReducer} from 'redux-form';


export default combineReducers({
  envelope: envelopeReducer,
  user: userReducer,
  form: formReducer
})