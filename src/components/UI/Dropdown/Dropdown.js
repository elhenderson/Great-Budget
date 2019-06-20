import React from 'react';

const dropdown = (props) => {
  const dropdownMenu = 
  <div>
    Dropdown
  </div>

  return props.isOpen ? dropdownMenu : null
}

export default dropdown;