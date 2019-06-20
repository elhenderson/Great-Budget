import React from 'react';

const envelope = (props) => {
  const envelopes = props.envelopes.map(envelope => (
    <h3 key={envelope}>{envelope}</h3>
  ))

  return (
    <div>
      <h1>Total: {props.cashFlow}</h1>
      {envelopes}
    </div>
  )
}

export default envelope;