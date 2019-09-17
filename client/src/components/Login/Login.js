import React, {useState, useEffect} from 'react';
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

const LoginForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(props.user)



  const authHandler = async (values) => {
    try {
      await props.getUser(values)
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <div className={styles.form}>
      <Form onSubmit={values => {
        authHandler(values);
        
      }}>
        {({handleSubmit, pristine, form, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div >
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

const mapStateToProps = (state, ownProps) => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUser: (user) => dispatch(userActions.getUser(user))
})

export default (connect(mapStateToProps, mapDispatchToProps)(LoginForm))

