import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Label, Button} from 'reactstrap';

let LoginForm = props => {
  const {handleSubmit, pristine} = props;
  const required = value => (value || typeof value === 'number' ? undefined : 'Required');
  const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
  const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        validate={[email, required]}
        warn={[email, required]}
      />
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Field 
          type="email" 
          name="email" 
          component={renderField} 
          placeholder="Enter a valid email"
          validate={[email]}
          warn={email} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Field type="password" name="password" component="input" placeholder="Enter a password"/>
      </FormGroup>
      <Button >Log in</Button>
    </Form>
  )
}
  
LoginForm = reduxForm({
  form: 'login'
})(LoginForm)

export default LoginForm;
