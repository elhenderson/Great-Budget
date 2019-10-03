import React from 'react';
import Modal from 'react-modal';
import {Form, Field} from 'react-final-form';

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

const AddEnvModal = ({
  modalIsOpen,
  mergeEnvelopeChanges,
  closeModal,
  setEnvelopeName,
  envelopeName
}) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Envelope"
    >
      <h2>Add Envelope</h2>
      <Form onSubmit={values => {
        mergeEnvelopeChanges(values.envelopeName)
      }} >
        {({handleSubmit, pristine, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field 
                component={renderField}
                name="envelopeName"
                value={envelopeName}
                onChange = {e => setEnvelopeName(e.target.value)}
              />
              <button type="submit" disabled={submitting | pristine}>
                Submit
              </button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Form>
    </Modal> 
  )
}

export default AddEnvModal
