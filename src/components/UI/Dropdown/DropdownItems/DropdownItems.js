import React from 'react';

const dropdownItems = (props) => {
  const dropdownMenu = 
  <div>
    Dropdown
  </div>
  return (
    <React.Fragment>
      {props.isOpen ? dropdownMenu : null}
    </React.Fragment>
  )
}

export default dropdownItems