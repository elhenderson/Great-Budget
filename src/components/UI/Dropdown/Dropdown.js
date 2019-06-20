import React from 'react';
import DropdownItems from './DropdownItems/DropdownItems';

const dropdown = (props) => {
  return (
    <React.Fragment>
      {props.children}
      {props.isOpen ? <DropdownItems isOpen={props.isOpen}/> : null}
    </React.Fragment>
  ) 
  
  
}

export default dropdown;