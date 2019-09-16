import React, {useEffect, useState} from 'react';
import * as envelopeActions from '../store/actions/evelope';
import Modal from 'react-modal';
import {Form, Field} from 'react-final-form';
import {connect} from 'react-redux';
import Select from 'react-select';
import * as transactionActions from '../store/actions/transaction';
import {toast} from 'react-toastify';
import {required, composeValidators} from '../utils/formValidators'

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





const Transactions = (props) => {
  const [initialEnvelopeValue, setInitialEnvelopeValue] = useState();
  const [envelopeValue, setEnvelopeValue] = useState();
  const [envelopeName, setEnvelopeName] = useState();
  const [selected, setSelected] = useState();
  const [selectedEnvToAdd, setSelectedEnvToAdd] = useState();
  const [selectedEnvToSubtract, setSelectedEnvToSubtract] = useState();

  const envelopeNames = Object.keys(props.envelopes).map(envelopeName => (
    {value: envelopeName, label: envelopeName}
  ))

  const renderSelect = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <Select 
          name="envelope"
          value={{label: selected, value: selected}}
          onChange={handleChange}
          options={envelopeNames}
        />
        {touched &&
          ((error && <span >{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const envToAddSelect = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <Select 
          name="envelope"
          value={{label: selectedEnvToAdd, value: selectedEnvToAdd}}
          onChange={handleEnvToAdd}
          options={envelopeNames}
        />
        {touched &&
          ((error && <span >{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const envToSubtractSelect = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <Select 
          name="envelope"
          value={{label: selectedEnvToSubtract, value: selectedEnvToSubtract}}
          onChange={handleEnvToSubtract}
          options={envelopeNames}
        />
        {touched &&
          ((error && <span >{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const handleChange = selectedOption => {
    setSelected(selectedOption.value);
  }

  const handleEnvToAdd = selectedOption => {
    setSelectedEnvToAdd(selectedOption.value)
  }

  const handleEnvToSubtract = selectedOption => {
    setSelectedEnvToSubtract(selectedOption.value);
  }

  useEffect(() => {
    initialEnvelopes();  
  }, [])

  function initialEnvelopes() {
    props.getEnvelopes();
  }

  const mergeEnvelopeChanges = (amountToSubtract) => {
    if (!selected) toast.warn("Please specify an envelope")
    else {

      const currentEnvelopeValue = props.envelopes[selected]

      const newEnvelopeValue = currentEnvelopeValue - amountToSubtract.value

      const updatedEnvelopesObj = {
        ...props.envelopes,
        [selected] : newEnvelopeValue.toFixed(2)
      }

      if (newEnvelopeValue < 0) toast.error("Insufficient funds")
      else {
        props.editEnvelopes(updatedEnvelopesObj);
        toast.success("Transaction received!");
        props.isTransacting(false);
        setSelected("")
      }
    }
  }

  const transferFundsChanges = (amountToTransfer) => {
    if (!selectedEnvToSubtract) toast.warn("Please specify an envelope")
    if (!selectedEnvToAdd) toast.warn("Please specify an envelope")

    const envToSubtract = props.envelopes[selectedEnvToSubtract]
    const envToAdd = props.envelopes[selectedEnvToAdd]

    const newFromEnvValue = +envToSubtract - +amountToTransfer.value
    const newToEnvValue = +envToAdd + +amountToTransfer.value

    const updatedEnvelopesObj = {
      ...props.envelopes,
      [selectedEnvToSubtract]: newFromEnvValue.toFixed(2),
      [selectedEnvToAdd]: newToEnvValue.toFixed(2)
    }

    if (newFromEnvValue < 0) toast.error("Insufficient funds")
    else {
      props.editEnvelopes(updatedEnvelopesObj);
      toast.success("Transfer successful!");
      props.isTransfering(false);
      setSelectedEnvToSubtract("");
      setSelectedEnvToAdd("");
    } 
  }

  const renderTransactions = () => {
      if (props.transacting)  return (
        <Modal
          ariaHideApp={false}
          isOpen={props.transacting}
          style={modalStyles}
          contentLabel="Add Transaction"
        >
          <h2>Add Transaction</h2>
          <hr/>
          <div>
            <button 
              onClick={() => props.isTransacting(false)}
              style={{position: 'fixed', right: '2px', top: '2px'}} 
            >
              X
            </button>
          </div>

          <Form onSubmit={value => {
            mergeEnvelopeChanges(value)
          }} >
            {({handleSubmit, pristine, submitting}) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Field 
                    component={renderSelect}
                  />
                  <p>{props.envelopes[selected]}</p>
                  <Field
                    component={renderField}
                    name="value"
                    value={envelopeValue}
                    onChange={e => setEnvelopeValue(e.target.value)}
                  />
                  <button type="submit" disabled={submitting, pristine}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Form>
        </Modal>
      ) 
      else if (props.transfering) return (
        <Modal
          ariaHideApp={false}
          isOpen={props.transfering}
          style={modalStyles}
          contentLabel="Transfer Funds"
        >
          <h2>Transfer Funds</h2>
          <hr/>
          <div>
            <button 
              onClick={() => props.isTransfering(false)}
              style={{position: 'fixed', right: '2px', top: '2px'}} 
            >
              X
            </button>
          </div>

          <Form onSubmit={value => {
            transferFundsChanges(value)
          }} >
            {({handleSubmit, pristine, submitting}) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <h3>From</h3>
                  <Field 
                    component={envToSubtractSelect}
                  />
                  <p>{props.envelopes[selectedEnvToSubtract]}</p>
                  <h3>To</h3>
                  <Field
                    component={envToAddSelect}
                  />
                  <p>{props.envelopes[selectedEnvToAdd]}</p>
                  <Field
                    component={renderField}
                    name="value"
                    value={envelopeValue}
                    onChange={e => setEnvelopeValue(e.target.value)}
                  />
                  <button type="submit" disabled={submitting, pristine}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Form>
        </Modal>
      )
      else return null
  }

  return (
    renderTransactions()
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes,
  transacting: state.transactions.transacting,
  transfering: state.transactions.transfering
})

const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes)),
  isTransacting: (isTransacting) => dispatch(transactionActions.isTransacting(isTransacting)),
  isTransfering: (isTransfering) => dispatch(transactionActions.transferFunds(isTransfering))
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);