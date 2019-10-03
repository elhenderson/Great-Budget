import React, {useEffect, useState} from 'react';
import * as envelopeActions from '../../store/actions/evelope';
import {connect} from 'react-redux';
import * as transactionActions from '../../store/actions/transaction';
import {toast} from 'react-toastify';
import './Transactions.scss';
import TransactionModal from './TransactionModal';
import TransferModal from './TransferModal';


const Transactions = ({
  envelopes,
  unallocated,
  isTransacting,
  isTransfering,
  getEnvelopes,
  getUnallocated,
  editEnvelopes,
  editUnallocated,
  transfering,
  transacting
}) => {
  const [envelopeValue, setEnvelopeValue] = useState();
  const [selected, setSelected] = useState();
  const [selectedEnvToAdd, setSelectedEnvToAdd] = useState();
  const [selectedEnvToSubtract, setSelectedEnvToSubtract] = useState();
  const [isUnallocated, setIsUnallocated] = useState(false);

  const envelopeNames = Object.keys(envelopes).map(envelopeName => (
    {value: envelopeName, label: envelopeName}
  ))

  envelopeNames.unshift({value: "unallocated", label: "unallocated"});

  const handleChange = selectedOption => {
    selectedOption.value === "unallocated" ? setIsUnallocated(true) : setIsUnallocated(false)
    setSelected(selectedOption.value);
  }

  const handleEnvToAdd = selectedOption => {
    selectedOption.value === "unallocated" ? setIsUnallocated(true) : setIsUnallocated(false)
    setSelectedEnvToAdd(selectedOption.value)
  }

  const handleEnvToSubtract = selectedOption => {
    selectedOption.value === "unallocated" ? setIsUnallocated(true) : setIsUnallocated(false)
    setSelectedEnvToSubtract(selectedOption.value);
  }

  useEffect(() => {
    getEnvelopes();
  }, [getEnvelopes])


  const mergeEnvelopeChanges = (amountToSubtract) => {
    if (!selected) toast.warn("Please specify an envelope")
    else {

      const currentEnvelopeValue = envelopes[selected]

      const newEnvelopeValue = currentEnvelopeValue - amountToSubtract.value

      const newUnallocatedValue = isUnallocated ? +unallocated - +amountToSubtract.value : +unallocated

      const updatedEnvelopesObj = isUnallocated ? {
        ...envelopes
      } : {
        ...envelopes,
        [selected] : newEnvelopeValue.toFixed(2)
      }

 

      if (newEnvelopeValue < 0) toast.error("Insufficient funds")
      else {
        isUnallocated ? editUnallocated(newUnallocatedValue) : editEnvelopes(updatedEnvelopesObj);
        toast.success("Transaction received!");
        isTransacting(false);
        setSelected("")
        isUnallocated ? getUnallocated() : getEnvelopes();
        setIsUnallocated(false);
      }
    }
  }

  const transferFundsChanges = (amountToTransfer) => {
    if (!selectedEnvToSubtract) toast.warn("Please specify an envelope")
    if (!selectedEnvToAdd) toast.warn("Please specify an envelope")
    if (selectedEnvToAdd === selectedEnvToSubtract) {
      toast.warn("You cannot transfer to the same envelope.")
      return
    } 

    const envToSubtract = envelopes[selectedEnvToSubtract] || unallocated
    const envToAdd = envelopes[selectedEnvToAdd]

    const newFromEnvValue = +envToSubtract - +amountToTransfer.value
    const newToEnvValue = +envToAdd + +amountToTransfer.value
    const newUnallocatedValue = isUnallocated ? +unallocated - +amountToTransfer.value : +unallocated 

    const updatedEnvelopesObj = isUnallocated ? {
      ...envelopes,
      [selectedEnvToAdd]: newToEnvValue.toFixed(2)
    } : {
      ...envelopes,
      [selectedEnvToSubtract]: newFromEnvValue.toFixed(2),
      [selectedEnvToAdd]: newToEnvValue.toFixed(2)
    }

    if (newFromEnvValue < 0) toast.error("Insufficient funds")
    else {
      editEnvelopes(updatedEnvelopesObj);
      editUnallocated(newUnallocatedValue.toFixed(2))
      toast.success("Transfer successful!");
      isTransfering(false);
      setSelectedEnvToSubtract("");
      setSelectedEnvToAdd("");
      getEnvelopes();
      getUnallocated();
      setIsUnallocated(false)
    } 
  }

  const renderTransactions = () => {
    if (transacting)  return (
      <TransactionModal 
        selected={selected}
        handleChange={handleChange}
        envelopeNames={envelopeNames}
        envelopeValue={envelopeValue}
        setEnvelopeValue={setEnvelopeValue}
        mergeEnvelopeChanges={mergeEnvelopeChanges}
        transacting={transacting}
        isTransacting={isTransacting}
        isUnallocated={isUnallocated}
        unallocated={unallocated}
        envelopes={envelopes}
      />
    ) 
    else if (transfering) return (
      <TransferModal
        selectedEnvToAdd={selectedEnvToAdd}
        handleEnvToAdd={handleEnvToAdd}
        selectedEnvToSubtract={selectedEnvToSubtract}
        handleEnvToSubtract={handleEnvToSubtract}
        envelopeNames={envelopeNames}
        transferFundsChanges={transferFundsChanges}
        isTransfering={isTransfering}
        transfering={transfering}
        setEnvelopeValue={setEnvelopeValue}
        isUnallocated={isUnallocated}
        unallocated={unallocated}
        envelopes={envelopes}
        envelopeValue={envelopeValue}
      />
    )
    else return null
  }

  return (
    renderTransactions()
  )
}

const mapStateToProps = state => ({
  envelopes: state.envelope.envelopes,
  unallocated: state.envelope.unallocated,
  transacting: state.transactions.transacting,
  transfering: state.transactions.transfering
})

const mapDispatchToProps = dispatch => ({
  getEnvelopes:() => dispatch(envelopeActions.getEnvelopes()),
  getUnallocated: () => dispatch(envelopeActions.getUnallocated()),
  editEnvelopes:(envelopes) => dispatch(envelopeActions.editEnvelopes(envelopes)),
  editUnallocated: (value) => dispatch(envelopeActions.editUnallocated(value)),
  isTransacting: (isTransacting) => dispatch(transactionActions.isTransacting(isTransacting)),
  isTransfering: (isTransfering) => dispatch(transactionActions.transferFunds(isTransfering))
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);