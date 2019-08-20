import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button} from 'reactstrap';
import {required, email, password} from '../../utils/formValidators'
import styles from './Login.module.css';

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

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className={styles.form}>
      <Form onSubmit={handleSubmit}>
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
        <div>
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
          <Button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </div>
      </Form>
      <a href="/register">Don't have an account? Register now!</a>
    </div>
  )
}

export default reduxForm({
  form: 'loginForm' // a unique identifier for this form
})(LoginForm)

