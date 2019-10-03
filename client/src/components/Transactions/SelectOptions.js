import React from 'react';
import Select from 'react-select';
import {Field} from 'react-final-form';

const selectStyle = {
  option: (provided, state) => ({
    ...provided,
    color: 'black'
  }),
  singleValue: (provided, state) => {
    return {...provided}
  }
}

const SelectOptions = ({
  selected,
  handleChange,
  envelopeNames
}) => {
  return (
    <Field 
      component={({
        input,
        label,
        type,
        placeholder,
        meta: { touched, error, warning }
      }) => (
        <div className="titleSpacing">
          <label>{label}</label>
          <div >
            <Select 
              styles={selectStyle}
              name="envelope"
              value={
                {label: selected, value: selected}
              }
              onChange={handleChange}
              options={envelopeNames}
            />
            {touched &&
              ((error && <span >{error}</span>) ||
                (warning && <span>{warning}</span>))}
          </div>
        </div>
      )}
    />
  )
}

export default SelectOptions
