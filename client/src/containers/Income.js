import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Form, Field} from 'react-final-form';
import {required, composeValidators } from '../utils/formValidators';
import * as envelopeActions from '../store/actions/evelope';
import FormStateToRedux from '../utils/formStateToRedux';
import FormStateFromRedux from '../utils/formStateFromRedux';
import uuidv4 from 'uuid';
import Modal from 'react-modal'


const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder}  />
      {touched &&
        ((error && <span >{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const modalStyles = {
  content : {
    transition: 'bottom 1s ease-out',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto'
  }
};


const Income = props => {
  // const [incomeSource, setIncomeSource] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("0.00");

  useEffect(() => {
    initialEnvelopes();
    
  }, [])
  function initialEnvelopes() {
    props.getEnvelopes();
  }

  const assignIncomeAmount = (income) => {
    setIncomeAmount(income);
    openModal();
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }


  const envelopes = () => {
    let envelopesArray = Object.entries(props.envelopes);
    const envelopes = envelopesArray.map((envelopeInfo, index) => (
        <Field 
          key={envelopeInfo[0]}
          name={envelopeInfo[0]}
          type="text"
          component={renderField}
          label={envelopeInfo[0]}
        />
    ))

    return envelopes;
  }

  const displayIncomeAmount = (amount) => {
    setIncomeAmount(amount);
  }

  return (
    <div>
      <h2>Add Income Source</h2>
      <hr />
      <Form 
      onSubmit={values => {
        assignIncomeAmount(values.incomeAmount) 
      }}>
        {({handleSubmit, pristine, form, submitting, incomeSource, setIncomeSource}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                validate={composeValidators(required)}
                onChange={e => setIncomeSource(e.target.value)}
                value={incomeSource}
                name="incomeSource"
                type="text"
                component={renderField}
                label="Received from"
                placeholder="My Employer"
              />
              <Field
                validate={composeValidators(required)}
                onChange={e => setIncomeAmount(e.target.value)}
                value={incomeAmount}
                name="incomeAmount"
                type="text"
                component={renderField}
                label="Amount"
              />
              <button type="submit" disabled={submitting, pristine}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Form>
      <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Edit Envelope"
      >
        {incomeAmount}
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes
})

 


const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Income);