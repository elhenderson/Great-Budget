import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Form, Field} from 'react-final-form';
import {required, composeValidators } from '../utils/formValidators';
import * as envelopeActions from '../store/actions/evelope';
import Modal from 'react-modal'
import {toast} from 'react-toastify';

Modal.defaultStyles.overlay.color = 'gray';
Modal.defaultStyles.overlay.background = 'gray';

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

let incomeOverageMessage = ""


const Income = props => {
  // const [incomeSource, setIncomeSource] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("0.00");
  // const [envelopesObj, setEnvelopesObj] = useState({})

  useEffect(() => {
    // initialEnvelopes();
    props.getEnvelopes();
    // setEnvelopesObj(props.envelopes)
  }, [])
  // function initialEnvelopes() {
  //   props.getEnvelopes();
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
    let currentEnvelopesArray = Object.entries(props.envelopes);
    const currentEnvelopes = currentEnvelopesArray.map(envelopeInfo => {
      return envelopeInfo[1]
    })
    
    let toAddEnvelopesArray = Object.entries(values)
    const toAddEnvelopes = toAddEnvelopesArray.map((envelopeInfo, index) => {
      const newEnvelopeAmount = (+envelopeInfo[1] + +currentEnvelopes[index]).toFixed(2)
      return newEnvelopeAmount
    })

    let envelopesTotal = 0;
    for (let envelopeValue in values) {
      envelopesTotal += +values[envelopeValue]
    }
    if (envelopesTotal <= incomeAmount) {
      let envelopeObj = values
      for (let i = 0; i < toAddEnvelopes.length; i++) {
        envelopeObj[currentEnvelopesArray[i][0]] = toAddEnvelopes[i]
      }
      props.editEnvelopes(envelopeObj);
      window.location.reload();
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
  

  const envelopes = () => {
    
    let envelopesArray = Object.entries(props.envelopes);
    const envelopes = envelopesArray.map((envelopeInfo, index) => (
        <div key={envelopeInfo[0]}>
          <Field 
            name={envelopeInfo[0]}
            type="text"
            component={renderField}
            label={envelopeInfo[0]}
          />
        </div>
    ))

    return envelopes;
  }

  // const displayIncomeAmount = (amount) => {
  //   setIncomeAmount(amount);
  // }

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
          {({handleSubmit, pristine, submitting}) => (
            <form onSubmit={handleSubmit}>
              <div>
                {envelopes()}
                <button type="submit" disabled={submitting, pristine} >Submit</button>
              </div>
            </form>
          )}
        </Form>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes
})

 


const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes))
})

export default connect(mapStateToProps, mapDispatchToProps)(Income);