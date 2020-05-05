import React, {Component} from 'react';
// import Flippy, { FrontSide, BackSide } from 'react-flippy';
import '../assets/styles/loginStyle.css';
// import {Link} from 'react-router-dom';
import 'react-bootstrap/';
import Recaptcha          from 'react-recaptcha';

import {logIn, signUp} from '../../repository';
import history         from '../../history';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname           : '',
      lname           : '',
      username        : '',
      password        : '',
      repeatedPassword: '',
      email           : '',
      gender          : '',
      med             : null,
      age             : '',
      bDate           : '',
      toggle          : true,
      value           : true,
      isVerified      : false,
      userVerify      : '',
      token           : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    // this.onPassword = this.onPassword.bind(this);
  }

  verifyCallback = (response) => {
    if (response) {
      this.setState({isVerified: true});
    }
  };
  handleChange = (e) => {
    if (e.target.name === 'bDate') {
      this.setState({[e.target.name]: e.target.value});
      this.calcDate(e);
    } else {
      this.setState({[e.target.name]: e.target.value});
    }

  };
  onRadioChange = (e) => {
    this.setState({gender: e.target.value});
  };
  changeSign = () => {
    this.setState({toggle: !this.state.toggle});
  };

  onSubmit = (e) => {
    e.preventDefault();

    const crypto = require('crypto');
    const newToken = crypto.randomBytes(10).toString('hex');

    const Crypto = require('cryptr');
    const cryptr = new Crypto('ffn_private_key_!!!!');

    const hash = crypto.createHmac('sha256', this.state.password)
        .update('I love cupcakes')
        .digest('hex');

    const encryptedString = cryptr.encrypt(this.state.password);

    const dataLogIn = {
      username: this.state.username,
      password: encryptedString,
    };
    // console.log(this.state.password,  this.state.username);
    logIn(dataLogIn)
        .then(data => {
          if (!data.level) {
            throw Error;
          }
          this.props.toggle();    // Close Modal
          this.props.setUserLevel(data.level);
          history.push('/user/profile');
        })
        .catch(err => alert(err));
  };
  onSignUp = (e) => {
    e.preventDefault();
    const ver = 0;
    if (this.state.password !== this.state.repeatedPassword) {
      alert('Password dont match');
    } else {
      if (this.state.isVerified) {
        const crypto = require('crypto');
        const newToken = crypto.randomBytes(10).toString('hex');
        // Create output query
        const Crypto = require('cryptr');
        const cryptr = new Crypto('ffn_private_key_!!!!');

        const encryptedString = cryptr.encrypt(this.state.password);

        const dataSign = {
          username: this.state.username,
          password: encryptedString,
          fname   : this.state.fname,
          lname   : this.state.lname,
          email   : this.state.email,
          age     : this.state.age,
          gender  : this.state.gender,
          level   : this.state.level,
          bDate   : this.state.bDate,
          verify  : ver,
          hash    : newToken,
        };
        signUp(dataSign)
            .then(() => {
                  alert(
                      'Successful sign up.Please proceed to your email, so you can verify your account.');
                  this.props.toggle();
                },
            )
            .catch(err => alert(err));
      } else {
        alert(
            'Please proceed with the recaptcha to verify that you are a human!');
      }
    }
  };
  onClose = () => {
    this.props.toggle();
    history.push('/forgotPassword');
  };
  calcDate = (dDate) => {
    let thenD = dDate.target.value;
    let str = thenD.split('-');
    let now = new Date();
    let ageDif = now.getFullYear() - str[0];
    this.setState({age: ageDif});
  };

  render() {
    return (

        <div className = { 'wrapper' }
             id = { 'LoginModal' }
             tabIndex = { '-1' }
             role = { 'dialog' }
             aria-labelledby = { 'exampleModalLabel' }
             aria-hidden = { 'true' }
        >
          <input type = { 'checkbox' }
                 name = { 'flipper__checkbox' }
                 id = { 'flipper__checkbox' }
                 className = { 'flipper__checkbox' }
                 hidden
          />

          <div className = { 'form__container' }>
            { this.state.toggle ?
                <div className = { 'form__login' }>
                  <h1 className = { 'form__header' }>Login</h1>
                  <div className = { 'imgcontainer' }>
                    {/*<div className = { 'cursive' }>*/ }

                    {/*</div>*/ }
                  </div>

                  <form id = { 'loginForm' }
                        action = { '#' }
                        method = { 'post' }
                        className = { 'form' }
                  >
                    <fieldset className = { 'form__group' }>
                      <label htmlFor = { 'username' }>
                                    <span className = { 'label__icon fa fa-user coloring' }>
                                    </span>
                      </label>
                      <input id = { 'username' }
                             name = { 'username' }
                             className = { 'form_element' }
                             type = { 'text' }
                             pattern = "^ *[a-zA-Z0-9]+.*"
                             placeholder = { 'Username' }
                             required
                             onChange = { this.handleChange }
                      />
                    </fieldset>
                    <fieldset className = { 'form__group' }>
                      <label htmlFor = "password">
                                    <span className = "label__icon fa fa-lock coloring">
                                    </span>
                      </label>
                      <input type = { 'password' }
                             className = { 'form_element' }
                             id = { 'pword' }
                             pattern = { '^ *[a-zA-Z]+.*' }
                             placeholder = { 'Enter Password' }
                             name = { 'password' }
                             required
                             onChange = { this.handleChange }
                      />
                    </fieldset>
                    <fieldset className = { 'form__group' }>
                      <input className = { 'form__button' }
                             type = { 'submit' }
                             value = { 'Login' }
                             onClick = { this.onSubmit }
                      />
                    </fieldset>

                    <fieldset className = { 'form__group' }
                              style = { {'paddingTop': 0} }
                    >
                      {/*<label htmlFor = { 'checkbox' }>*/ }
                      {/*  <input id = { 'checkbox' }*/ }
                      {/*         name = { 'checkbox' }*/ }
                      {/*         className = { 'checkbox--forget' }*/ }
                      {/*         type = { 'checkbox' }*/ }
                      {/*  />*/ }
                      {/*  <span className = { 'subtitle' }>Remember me</span>*/ }
                      {/*</label>*/ }
                      <small>
                        <button style = { {
                          'backgroundColor': 'transparent',
                          'border'         : 'none',
                          'paddingLeft'    : 0,
                        } }
                                className = { 'form__link' }
                                onClick = { this.onClose }
                        >Forgot your password?
                        </button>
                        <br />
                        {/*<span className = { 'subtitle' }> Not a member yet?</span>*/}
                        {/*<small className = { 'form__link' }*/}
                        {/*       onClick = { this.changeSign }*/}
                        {/*>*/}
                        {/*  Create your account*/}
                        {/*</small>*/}
                        {/*.*/}
                      </small>
                    </fieldset>
                  </form>
                </div>
                :
                <div className = { 'form__signup' }>
                  <h1 className = { 'form__header' }>Sign Up</h1>
                  <form id = { 'signupForm' }
                        method = { 'post' }
                        className = { 'form' }
                  >
                    <fieldset className = { 'form__group' }>
                      <label htmlFor = { 'signUpName' }>
                                        <span className = { 'label__icon fa fa-user coloring' }>
                                        </span>
                      </label>
                      <input name = { 'fname' }
                             className = { 'form_element signUpName' }
                             type = { 'text' }
                             onChange = { this.handleChange }
                             placeholder = { 'First Name' }
                             required
                      />
                      <span>
                                           </span>
                      <input name = { 'lname' }
                             className = { 'form_element signUpName' }
                             type = { 'text' }
                             onChange = { this.handleChange }
                             placeholder = { 'Last Name' }
                             required
                      />

                    </fieldset>
                    <fieldset className = { 'form__group' }>
                      <label htmlFor = { 'username' }>
                                        <span className = { 'label__icon fa fa-user coloring' }>
                                        </span>
                      </label>
                      <input id = { 'signUpUsername' }
                             name = { 'username' }
                             className = { 'form__element' }
                             type = { 'text' }
                             onChange = { this.handleChange }
                             placeholder = { 'Username' }
                             required
                      />
                    </fieldset>

                    <fieldset className = { 'form__group' }>
                      <label htmlFor = { 'signUpMail' }>
                        <span className = { 'label__icon fa fa-envelope coloring' }>
                        </span>
                      </label>
                      <input id = { 'signUpMail' }
                             name = { 'email' }
                             className = { 'form__element' }
                             type = { 'email' }
                             onChange = { this.handleChange }
                             placeholder = { 'Email' }
                             required
                      />
                    </fieldset>
                    <fieldset className = { 'form__group' }>
                      <label htmlFor = { 'signUpPassword' }>
                        <span className = { 'label__icon fa fa-lock coloring' }>
                        </span>
                      </label>
                      <input id = { 'signUpPassword' }
                             name = { 'password' }
                             className = { 'form__element' }
                             type = { 'password' }
                             onChange = { this.handleChange }
                             placeholder = { 'Password' }
                             required
                      />
                    </fieldset>
                    <fieldset className = { 'form__group' }>
                      <label htmlFor = { 'signUpPasswordRepeat' }>
                        <span className = { 'label__icon fa fa-lock coloring' }>
                        </span>
                      </label>
                      <input id = "signUpPasswordRepeat"
                             name = { 'repeatedPassword' }
                             className = { 'form__element' }
                             type = { 'password' }
                             onChange = { this.handleChange }
                             placeholder = { 'Repeat Password' }
                             required
                      />
                    </fieldset>
                    <fieldset className = { 'form__group' }>
                      <label htmlFor = { 'age' } id = { 'birthday' }>
                        <span className = { 'subtitle' }> Birth Date: </span>
                        <span className = { 'fas fa-birthday-cake' }>
                                        </span>
                      </label>
                      <input id = { 'signUpAge' }
                             name = { 'bDate' }
                             className = { 'form_element' }
                             type = { 'date' }
                             onChange = { this.handleChange }
                             placeholder = { 'Birth Date' }
                             min = { '1900-01-01' }
                             max = { '2010-01-01' }
                             required
                      />
                    </fieldset>
                    <fieldset className = { 'form__group' }>
                      <div className = { 'form__radio' }>
                        <label className = { 'label__style' }>Male
                          <input type = { 'radio' }
                                 value = { '1' }
                                 checked = { this.state.gender === '1' }
                                 onChange = { this.onRadioChange }
                          />
                          <span className = { 'checkmark' }/>
                        </label>
                        <label className = { 'label__style' }>Female
                          <input type = { 'radio' }
                                 value = { '2' }
                                 checked = { this.state.gender === '2' }
                                 onChange = { this.onRadioChange }
                          />
                          <span className = { 'checkmark' }/>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset className = { 'form__group' }>
                      <input className = { 'form__button' }
                             type = { 'submit' }
                             value = { 'Sign up' }
                             onClick = { this.onSignUp }
                      />
                    </fieldset>
                    <Recaptcha
                        elementID = { 'g-recaptcha' }
                        sitekey = "6Lf0od8UAAAAAFoog9iFIpVd8rcPxBwHpUKpnCua"
                        render = "explicit"
                        theme = "dark"
                        verifyCallback = { this.verifyCallback }
                    />
                    <small>
                      <span className = { 'subtitle' }> Are you already a member?</span>
                      <label htmlFor = { 'flipper__checkbox' }
                             onClick = { this.changeSign }
                             className = { 'form__link' }
                      >
                        Click here to login
                      </label>
                      .
                    </small>
                  </form>
                </div>
            }
          </div>
        </div>
    );
  }
}

export default LoginModal;