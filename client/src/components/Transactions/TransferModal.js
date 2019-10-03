import React from 'react'
import {Form, Field} from 'react-final-form';
import SelectOptions from './SelectOptions';
import Modal from 'react-modal';
import {currency, required, composeValidators} from '../../utils/formValidators';

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

const TransferModal = ({
  selectedEnvToSubtract,
  handleEnvToSubtract,
  envelopeNames,
  transferFundsChanges,
  isTransfering,
  transfering,
  selectedEnvToAdd,
  handleEnvToAdd,
  setEnvelopeValue,
  isUnallocated,
  unallocated,
  envelopes,
  envelopeValue
}) => {
  return (
    <Modal
      onRequestClose={() => isTransfering(false)}
      ariaHideApp={false}
      isOpen={transfering}
      
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
              <SelectOptions
                selected={selectedEnvToSubtract}
                handleChange={handleEnvToSubtract}
                envelopeNames={envelopeNames}
              />
              <p>{isUnallocated ? unallocated :  envelopes[selectedEnvToSubtract]}</p>
              <h3>To</h3>
              {/* <Field
                name="envToAdd"
                component={envToAddSelect}
              /> */}
              <SelectOptions
                selected={selectedEnvToAdd}
                handleChange={handleEnvToAdd}
                envelopeNames={envelopeNames}
              />
              <p>{envelopes[selectedEnvToAdd]}</p>
              <Field
                label={<h3>Amount</h3>}
                component={renderField}
                name="value"
                value={envelopeValue}
                onChange={e => setEnvelopeValue(e.target.value)}
                validate={composeValidators(currency, required)}
              />
              <button type="submit" disabled={submitting || pristine || !selectedEnvToAdd || !selectedEnvToSubtract}>
                Submit
              </button>
              <button type="button" onClick={() => isTransfering(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  )
}

export default TransferModal
