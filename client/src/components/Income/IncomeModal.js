import React from 'react';
import Modal from 'react-modal';
import {Form} from 'react-final-form';

const IncomeModal = ({
  modalIsOpen,
  closeModal,
  incomeAmount,
  incomeOverageMessage,
  incomeOverageValidator,
  retrieveEnvelopes
}) => {
  return (
    <Modal
    ariaHideApp={false}
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Edit Envelope"
    >
      <h3>Plan your finances</h3>
      <hr/>
      <h4>Decide where you'll spend your money</h4>
      Current income: {incomeAmount}
      <p>
        {incomeOverageMessage}
      </p>
      <Form 
      onSubmit={(values) => {
        incomeOverageValidator(values) 
      }}>
        {({handleSubmit, pristine, submitting, form}) => (
          <form onSubmit={handleSubmit}>
            <div>
              {retrieveEnvelopes()}
              <button type="submit" disabled={submitting} >Submit</button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  )
}

export default IncomeModal
