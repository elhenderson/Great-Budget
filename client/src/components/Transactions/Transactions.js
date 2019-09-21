import React, {useEffect, useState} from 'react';
import * as envelopeActions from '../../store/actions/evelope';
import Modal from 'react-modal';
import {Form, Field} from 'react-final-form';
import {connect} from 'react-redux';
import Select from 'react-select';
import * as transactionActions from '../../store/actions/transaction';
import {toast} from 'react-toastify';
import {currency, required, composeValidators} from '../../utils/formValidators'
import './Transactions.scss';

Modal.defaultStyles = {};

// const modalStyles = {
//   content : {
//     transition: 'bottom 1s ease-out',
//     transform: 'translate(-50%, -50%)',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     animation: 'fadein 2s'
//   }
// };

const selectStyle = {
  option: (provided, state) => ({
    ...provided,
    color: 'black'
  }),
  singleValue: (provided, state) => {
    return {...provided}
  }
}



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
  const [envelopeValue, setEnvelopeValue] = useState();
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
    <div className="titleSpacing">
      <label>{label}</label>
      <div >
        <Select 
          styles={selectStyle}
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
    <div className="titleSpacing">
      <label>{label}</label>
      <div>
        <Select 
          styles={selectStyle}
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
    <div className="titleSpacing">
      <label>{label}</label>
      <div>
        <Select 
          styles={selectStyle}
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
    props.getEnvelopes();
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
        setTimeout( function() {
          window.location.reload()
        }, 1500)
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
      setTimeout( function() {
        window.location.reload()
      }, 1500)
    } 
  }

  const renderTransactions = () => {
      if (props.transacting)  return (
        <Modal
          onRequestClose={() => props.isTransacting(false)}
          ariaHideApp={false}
          isOpen={props.transacting}
          style={{}}
          contentLabel="Add Transaction"
        >
          <h2>Add Transaction</h2>
          <hr/>

          <Form onSubmit={value => {
            mergeEnvelopeChanges(value)
          }} >
            {({handleSubmit, pristine, submitting}) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <h4>Envelope Name</h4>
                  <Field 
                    component={renderSelect}
                  />
                  <p>{props.envelopes[selected]}</p>
                  <h4>Amount</h4>
                  <div className="titleSpacing">
                    <Field
                      
                      component={renderField}
                      name="value"
                      value={envelopeValue}
                      onChange={e => setEnvelopeValue(e.target.value)}
                      validate={composeValidators(currency, required)}
                    />
                  </div>

                  <button type="submit" disabled={submitting || pristine || !selected}>
                    Submit
                  </button>
                  <button type="button" onClick={() => props.isTransacting(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Form>
        </Modal>
      ) 
      else if (props.transfering) return (
        <Modal
          onRequestClose={() => props.isTransfering(false)}
          ariaHideApp={false}
          isOpen={props.transfering}
          style={{}}
          contentLabel="Transfer Funds"
        >
          <h2>Transfer Funds</h2>
          <hr/>

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
                    validate={composeValidators(currency, required)}
                  />
                  <button type="submit" disabled={submitting || pristine || !selectedEnvToAdd || !selectedEnvToSubtract}>
                    Submit
                  </button>
                  <button type="button" onClick={() => props.isTransfering(false)}>
                    Cancel
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