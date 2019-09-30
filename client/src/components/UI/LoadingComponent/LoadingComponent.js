import React from 'react';
import {Spinner} from 'reactstrap';
import './LoadingComponent.scss'

const LoadingComponent = () => {
  return (
    <div  className="loading">
      <Spinner color='light' />
      <h2>Loading...</h2>
    </div>
  )
}

export default LoadingComponent
