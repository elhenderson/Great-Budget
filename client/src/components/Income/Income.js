import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Form, Field} from 'react-final-form';
import {required, composeValidators, currency } from '../../utils/formValidators';
import * as envelopeActions from '../../store/actions/evelope';
import Modal from 'react-modal'
import {toast} from 'react-toastify';
import './Income.scss'

// Modal.defaultStyles.overlay.color = 'gray';
// Modal.defaultStyles.overlay.background = 'gray';

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

// const modalStyles = {
//   content : {
//     transition: 'bottom 1s ease-out',
//     transform: 'translate(-50%, -50%)',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto'
//   }
// };

let incomeOverageMessage = ""


const Income = ({
  envelopes,
  unallocated,
  getEnvelopes,
  getUnallocated,
  editEnvelopes,
  editUnallocated
}) => {
  // const [incomeSource, setIncomeSource] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("0.00");
  // const [envelopesObj, setEnvelopesObj] = useState({})

  useEffect(() => {
    // initialEnvelopes();
    getEnvelopes();
    getUnallocated();
    // setEnvelopesObj(envelopes)
  }, [getEnvelopes, getUnallocated])
  // function initialEnvelopes() {
  //   getEnvelopes();
  // }

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

  const incomeOverageValidator = (values) => {
    let updatedUnallocated = +incomeAmount + +unallocated;
    let envelopesTotal = 0;
    let envelopesCopy = {...values}

    for (let envelopeName in envelopesCopy) {
      updatedUnallocated -= parseInt(envelopesCopy[envelopeName])
      envelopesTotal += parseFloat(envelopesCopy[envelopeName])
      
      envelopesCopy[envelopeName] = parseFloat(envelopesCopy[envelopeName])
      envelopesCopy[envelopeName] = +envelopesCopy[envelopeName] + +envelopes[envelopeName]
      envelopesCopy[envelopeName] = envelopesCopy[envelopeName].toFixed(2)

    }

    if (+envelopesTotal <= +incomeAmount) {
      const updatedEnvelopesObj = {
        ...envelopes,
        ...envelopesCopy

      }
      editEnvelopes(updatedEnvelopesObj);
      editUnallocated(updatedUnallocated.toFixed(2))
      setModalIsOpen(false);
      toast.success("Income added!")
      getEnvelopes();
      getUnallocated();
    } else {
      toast.error('Error: Envelope total exceeds income amount!', {
        position: "top-right",
        'autoClose': 5000,
        'hideProgressBar': false,
        'closeOnClick': true,
        'pauseOnHover': true,
        'draggable': true
        });
    }
  }
  

  const retrieveEnvelopes = () => {
    
    let envelopesArray = Object.entries(envelopes);
    const renderEnvelopes = envelopesArray.map((envelopeInfo, index) => (
        <div key={envelopeInfo[0]}>
          <Field 
            name={envelopeInfo[0]}
            type="text"
            component={renderField}
            label={envelopeInfo[0]}
            validate={composeValidators(currency)}
          />
        </div>
    ))

    return renderEnvelopes;
  }

  // const displayIncomeAmount = (amount) => {
  //   setIncomeAmount(amount);
  // }

  return (
    <div className="incomeForm">
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
                validate={composeValidators(required, currency)}
                onChange={e => setIncomeAmount(e.target.value)}
                value={incomeAmount}
                name="incomeAmount"
                type="text"
                component={renderField}
                label="Amount"
              />
              <button type="submit"  disabled={submitting | pristine}>
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
    </div>
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes,
  unallocated: state.envelope.unallocated
})

 


const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  getUnallocated: () => dispatch(envelopeActions.getUnallocated()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes)),
  editUnallocated:(amount) => dispatch(envelopeActions.editUnallocated(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(Income);