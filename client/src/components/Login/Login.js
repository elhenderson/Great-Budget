import React, {useState} from 'react';
import {Form, Field} from 'react-final-form';
// import {Form, FormGroup, Button} from 'reactstrap';
import {required, email as emailValidator, password as passwordValidator, composeValidators} from '../../utils/formValidators'
import styles from './Login.module.css';
import {connect} from 'react-redux';
import * as userActions from '../../store/actions/user';

const renderField = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} />
      {touched &&
        ((error && <span >{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const onSubmit = values => {
  userActions.getUser(values);
}

const LoginForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className={styles.form}>
      <Form onSubmit={values => {
        console.log(values)
        props.getUser(values);
      }}>
        {({handleSubmit, pristine, form, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div >
            <Field
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
            <button type="submit"  disabled={submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={form.reset}>
              Clear Values
            </button>
            </div>
          </form>
        )}
       
      </Form>
      <a href="/register">Don't have an account? Register now!</a>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUser: (user) => dispatch(userActions.getUser(user))
})

export default (connect(mapStateToProps, mapDispatchToProps)(LoginForm))

