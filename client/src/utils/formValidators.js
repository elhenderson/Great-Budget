import React, {Fragment} from 'react';
import uuidv4 from 'uuid';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';


export const required = value => (value || typeof value === 'number' ? undefined : <p  style={{color: 'red'}} ><FontAwesomeIcon key={uuidv4()} style={{color: 'red', marginRight: '5px'}} icon={faExclamationCircle} />This field is required</p>)
export const email = value => 
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? <p style={{color: 'red'}} ><FontAwesomeIcon key={uuidv4()} style={{color: 'red', marginRight: '5px'}} icon={faExclamationCircle} />Invalid email</p>
    : undefined
export const password = value => 
  value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(value)
    ?  
    <React.Fragment key={uuidv4()}>
        <p style={{color: 'red'}} ><FontAwesomeIcon key={uuidv4()} style={{color: 'red', marginRight:      '5px'}} icon={faExclamationCircle} />Must contain at least 1 lowercase letter</p>
        <p style={{color: 'red'}} ><FontAwesomeIcon key={uuidv4()} style={{color: 'red', marginRight: '5px'}} icon={faExclamationCircle} />Must contain at least 1 uppercase letter</p>
        <p style={{color: 'red'}} ><FontAwesomeIcon key={uuidv4()} style={{color: 'red', marginRight: '5px'}} icon={faExclamationCircle} />Must contain at least 1 number</p>
        <p style={{color: 'red'}} ><FontAwesomeIcon key={uuidv4()} style={{color: 'red', marginRight: '5px'}} icon={faExclamationCircle} />Must contain at least 1 special character</p>
        <p style={{color: 'red'}} ><FontAwesomeIcon key={uuidv4()} style={{color: 'red', marginRight: '5px'}} icon={faExclamationCircle} />Must be eight characters or longer</p>
    </React.Fragment>
    : undefined
export const confirmPassword = (value, allValues) => value && value !== allValues.password
  ? <p style={{color: 'red'}} ><FontAwesomeIcon key={uuidv4()} style={{color: 'red', marginRight: '5px'}} icon={faExclamationCircle} />Passwords must match</p>
  : undefined
