import React from 'react'
import {Form, Field} from 'react-final-form';
import SelectOptions from './SelectOptions';
import Modal from 'react-modal';
import {currency, required, composeValidators} from '../../utils/formValidators'

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

const TransactionModal = ({
  selected,
  handleChange,
  envelopeNames,
  envelopeValue,
  setEnvelopeValue,
  mergeEnvelopeChanges,
  transacting,
  isTransacting,
  isUnallocated,
  unallocated,
  envelopes
}) => {
  return (
    <Modal
      onRequestClose={() => isTransacting(false)}
      ariaHideApp={false}
      isOpen={transacting}
      
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
              <SelectOptions 
                selected={selected} 
                handleChange={handleChange} 
                envelopeNames={envelopeNames}
              />
              <p>{isUnallocated ? unallocated :  envelopes[selected]}</p>
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
              <button type="button" onClick={() => isTransacting(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  )
}

export default TransactionModal
