import React, {Component} from 'react';
import '../assets/styles/forgotPassword.css';
import {newPassword}      from '../../repository';
import Swal               from 'sweetalert2';
import history            from '../../history';
import ButtonLoader       from '../common/ButtonLoader';

class forgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email       : '',
      username    : '',
      showError   : false,
      sendingEmail: false,
      confirming  : true,
      loading     : false,
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
      this.setState({loading: true});
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
                'Something went wrong',
                'Please try again...',
                'error',
            ).then();
          }).finally(() => this.setState({loading: false}));
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
              <ButtonLoader loading = { this.state.loading }
                            text = { 'Submit' }
                            loadingText = { 'Sending Email...' }
                            type = { 'submit' }
                            className = { 'emailSubmit' }
                            onClick = { this.sendEmailPass }
              />
            </form>
          </div>
        </div>
    );
  }
}

export default forgotPassword;
