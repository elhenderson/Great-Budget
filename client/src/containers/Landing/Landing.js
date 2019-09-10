import React, { Component } from 'react';
import LoginForm from "../../components/Login/Login";
import RegisterForm from "../../components/Register/Register";


class Landing extends Component {
  state = {
    registering: false
  }



  submit = values => {
    console.log(values);
  }
  

  render() {

    // let determineForm;

    // if (!this.state.registering) {
      // determineForm = (
      //   <div>
      //     <LoginForm onSubmit={this.submit} />
      //     <div>
      //       <a href="#" onClick={this.registering}>Not a user? Register now!</a>
      //     </div>
      //   </div>
      // )
    // } else {
    //   determineForm = (
    //     <div>
    //       <Form>
    //         <FormGroup>
    //           <Label for="email">Email</Label>
    //           <Input type="email" name="email" placeholder="Enter a valid email"/>
    //         </FormGroup>
    //         <FormGroup>
    //           <Label for="Password">Password</Label>
    //           <Input type="password" name="password" placeholder="Enter a password"/>
    //         </FormGroup>
    //         <FormGroup>
    //           <Label for="ConfirmPassword">Confirm Password</Label>
    //           <Input type="password" name="confirmPassword" placeholder="Confirm your password"/>
    //         </FormGroup>
    //         <Button disabled={this.state.allFieldsValid === false} >Register</Button>
    //       </Form>
    //       <div>
    //         <a href="#" onClick={this.registering}>Log in</a>
    //       </div>
    //     </div>
    //   )
    // }


    return (
      <div className="container">
        {/* {determineForm} */}
        <LoginForm onSubmit={this.submit} />
        {/* <RegisterForm onSubmit={this.submit} /> */}
      </div>
    )
  }
}

export default Landing;