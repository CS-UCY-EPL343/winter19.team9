import React, {Component} from 'react';
import '../assets/styles/loginStyle.css';

class CreateStaffMember extends Component {
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.calcDate = this.calcDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

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
  calcDate = (dDate) => {
    let thenD = dDate.target.value;
    let str = thenD.split('-');
    let now = new Date();
    let ageDif = now.getFullYear() - str[0];
    this.setState({age: ageDif});
  };
  onSubmit = (e) => {
    e.preventDefault();
    // const confirm_password = document.getElementById('signUpPasswordRepeat');
    if (this.state.password !== this.state.repeatedPassword) {
      alert('Passwords Don\'t Match');
    }
    if (this.state.gender === '') {
      alert('Pick a gender');
    }
    alert('Creating ' + this.props.staffType);
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
                    <span className = { 'fa fa-birthday-cake' } style={{color: 'white'}}/>
                    <span className = { 'subtitle' }> Birth Date: </span>
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
                      <span className = { 'checkmark' } />
                    </label>
                    <label className = { 'label__style' }>Female
                      <input type = { 'radio' }
                             value = { '2' }
                             checked = { this.state.gender === '2' }
                             onChange = { this.onRadioChange }
                      />
                      <span className = { 'checkmark' } />
                    </label>
                  </div>
                </fieldset>
                <fieldset className = { 'form__group' }>
                  <input className = { 'form__button' }
                         type = { 'submit' }
                         value = { 'Sign up' }
                         onClick = { this.onSubmit }
                  />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default CreateStaffMember;