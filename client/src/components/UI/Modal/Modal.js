import React, {useState, ReactDOM} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {connect} from 'react-redux';
import * as envelopeActions from '../../../store/actions/evelope' 
import { set } from 'mongoose';


const Modal = ({children}) => (
  ReactDOM.createPortal(
    <div className="modal">
      {children}
    </div>,
    document.getElementById('modal-root')
  )
)

export default Modal;