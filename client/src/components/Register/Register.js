import React, {useState} from 'react';
import {Form, Field} from 'react-final-form';
import {required, email as emailValidator, password as passwordValidator, confirmPassword as confirmPasswordValidator, composeValidators} from '../../utils/formValidators'
import './Register.scss';
import {connect} from 'react-redux';
import * as userActions from '../../store/actions/user';
import {toast} from 'react-toastify';

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

const RegisterForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = (values) => {
    try {
      props.addUser(values);
    } catch(err) {
      toast.error(err)
    }
  }

  return (
    <div className="registerForm" >
      <h2>Register</h2>
      <hr />
      <Form  onSubmit={values => {
        registerUser(values);
      }}>
        {({handleSubmit, pristine, form, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                validate={composeValidators(required, emailValidator)}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name="email"
                type="email"
                component={renderField}
                label="Email"
                placeholder="Enter a valid email"
              />
            </div>
            <div>
              <Field 
                validate={composeValidators(required, passwordValidator)}
                onChange={e => setPassword(e.target.value)}
                value={password}
                name="password"
                type="password"
                component={renderField}
                label="Password"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <Field
                validator={composeValidators(required, confirmPasswordValidator)}
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                name="confirmPassword"
                type="password"
                component={renderField}
                label="Confirm Password"
                placeholder="Confirm your password"
              />
            </div>
            <div>
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button type="button" disabled={pristine || submitting} onClick={form.reset}>
                Clear Values
              </button>
            </div>
          </form>   
        )}  
      </Form>
      <a href="/" >Log in</a>
    </div>

  )
}

const mapDispatchToProps = dispatch => ({
  addUser: (user) => dispatch(userActions.addUser(user)),
  getUser: (user) => dispatch(userActions.getUser(user))
})

export default connect(null, mapDispatchToProps)(RegisterForm)