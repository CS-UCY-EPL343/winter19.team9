import React, {Component} from 'react';
import '../assets/styles/forgotPassword.css';
import {newPassword}      from '../../repository';
import Swal               from 'sweetalert2';
import history            from '../../history';

class forgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email       : '',
      username    : '',
      showError   : false,
      sendingEmail: false,
      confirming  : true,
    };
    this.onMailChange = this.onMailChange.bind(this);
    this.sendEmailPass = this.sendEmailPass.bind(this);

  }

  onMailChange = (e) => {
    this.setState({email: e.target.value});
  };

  sendEmailPass = (e) => {
    e.preventDefault();
    if (this.state.email === '') {
      Swal.fire(
          'Please write your email first',
          '',
          'error',
      ).then();
    } else {
      const input = {
        email: this.state.email,
      };
      newPassword(input)
          .then(() => {
            Swal.fire(
                'Success go check your email',
                '',
                'success',
            ).then(() => {
              history.push('/');
            });
          })
          .catch(() => {
            Swal.fire(
                'Something go wrong',
                '',
                'error',
            ).then();
          });
    }
  };

  render() {
    return (
        <div id = { 'ForgotPassword' }>
          <div className = { 'PasswordContainer' }>
            <div className = { 'PageHeader' }>
              <h1>Forgot your password?</h1>
            </div>
            <p>Enter your email.</p>
            <form className = { 'passwordForm' }>
              <input type = { 'email' }
                     className = { 'emailText' }
                     onChange = { this.onMailChange }
              />
              <input type = { 'submit' }
                     className = { 'emailSubmit' }
                     value = { 'Submit' }
                     onClick = { this.sendEmailPass }
              />
            </form>
          </div>
        </div>
    );
  }
}

export default forgotPassword;
