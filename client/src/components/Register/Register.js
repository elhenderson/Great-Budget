import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button} from 'reactstrap';
import {required, email, password, confirmPassword} from '../../utils/formValidators'
import styles from './Register.module.css';

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
      <input {...input} placeholder={placeholder} type={type} />
      {touched &&
        ((error && <span >{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className={styles.form}>
      <h2>Register</h2>
      <hr />
      <Form  onSubmit={handleSubmit}>
        <FormGroup >
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
            placeholder="Enter a valid email"
            validate={[email, required]}
          />
        </FormGroup>
        <FormGroup>
          <Field 
            
            name="password"
            type="password"
            component={renderField}
            validate={[required, password]}
            label="Password"
            placeholder="Enter your password"
          />
        </FormGroup>
        <FormGroup>
          <Field 
            name="confirmPassword"
            type="password"
            component={renderField}
            validate={[required, confirmPassword]}
            label="Confirm Password"
            placeholder="Enter your password again"
          />
        </FormGroup>
        <div>
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
          <Button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </div>
      </Form>
      <a href="/login" >Log in</a>
    </div>

  )
}

export default reduxForm({
  form: 'registerForm' // a unique identifier for this form
})(RegisterForm)