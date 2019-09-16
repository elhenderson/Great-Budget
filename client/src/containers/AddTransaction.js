import React, {useEffect, useState} from 'react';
import * as envelopeActions from '../store/actions/evelope';
import Modal from 'react-modal';
import {Form, Field} from 'react-final-form';
import {connect} from 'react-redux';
import Select from 'react-select';
import * as transactionActions from '../store/actions/transaction';
import {toast} from 'react-toastify';

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

const dropdownOptions = ['one', 'two', 'three']


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





const AddTransaction = (props) => {
  const [initialEnvelopeValue, setInitialEnvelopeValue] = useState();
  const [envelopeValue, setEnvelopeValue] = useState();
  const [envelopeName, setEnvelopeName] = useState();
  const [selected, setSelected] = useState();

  const envelopeNames = Object.keys(props.envelopes).map(envelopeName => (
    {value: envelopeName, label: envelopeName}
  ))

  console.log(envelopeNames)

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
          value={selected}
          onChange={handleChange}
          options={envelopeNames}
        />
        {touched &&
          ((error && <span >{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  const handleChange = selectedOption => {
    setSelected(selectedOption);
  }


  useEffect(() => {
    initialEnvelopes();  
  }, [])

  function initialEnvelopes() {
    props.getEnvelopes();
  }

  const mergeEnvelopeChanges = (amountToSubtract) => {
    const currentEnvelopeValue = props.envelopes[selected.value]
    console.log(selected.value, amountToSubtract.value)
    console.log(props.envelopes)
    console.log(props.envelopes[selected.value])

    const newEnvelopeValue = currentEnvelopeValue - amountToSubtract.value

    console.log(newEnvelopeValue)

    const updatedEnvelopesObj = {
      ...props.envelopes,
      [selected.value] : newEnvelopeValue.toFixed(2)
    }
    console.log(updatedEnvelopesObj)

    if (newEnvelopeValue < 0) toast.error("Insufficient funds")
    else {
      props.editEnvelopes(updatedEnvelopesObj);
      toast.success("Transaction received!");
      props.isTransacting(false);
    }
  }

  return (
    props.transacting  ? <Modal
      ariaHideApp={false}
      isOpen={props.transacting}
      style={modalStyles}
      contentLabel="Add Transaction"
    >
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
    </Modal> : null
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes,
  transacting: state.transacting.transacting
})

const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes)),
  isTransacting: (isTransacting) => dispatch(transactionActions.isTransacting(isTransacting))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);