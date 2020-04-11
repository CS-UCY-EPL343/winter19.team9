import React, {Component} from 'react';
import '../assets/styles/loginStyle.css';
import {insertAdmin, insertCoach, signUp} from "../../repository";
import history from "../../history";

class CreateStaffMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName           : '',
      lastName           : '',
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
    if(this.state.firstName === ""){
      alert("First name couldn't be empty");
    }else if(this.state.lastName === ""){
      alert("Last name couldn't be empty");
    }else if(this.state.username === ""){
      alert("Username couldn't be empty");
    }else if(this.state.email === ""){
      alert("Email couldn't be empty");
    }else if(this.state.password === ""){
      alert("Password couldn't be empty");
    }else if(this.state.repeatedPassword === ""){
      alert("Repeat Password couldn't be empty");
    }else if(this.state.bDate === ""){
      alert("Birth Date couldn't be empty");
    }else if(this.state.gender === ""){
      alert("Gender couldn't be empty");
    } else if (this.state.password !== this.state.repeatedPassword) {
      alert('Passwords Don\'t Match');
    }else {
      const data = {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        LastName: this.state.lastName,
        email: this.state.email,
        age: this.state.age,
        gender: this.state.gender,
        level: this.state.level,
        bDate: this.state.bDate,
      };
      if (this.props.staffType === 'coach') {
        insertCoach(data).then(() => {
          alert('Success!!!');
          history.push('/')
        })
            .catch(err => alert(err));
      }else if(this.props.staffType === 'admin'){
        insertAdmin(data).then(() => {
          alert('Success!!!');
          history.push('/')
        })
            .catch(err => alert(err));
      }
      alert('Creating ' + this.props.staffType);
    }
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
                  <input name = { 'firstName' }
                         className = { 'form_element signUpName' }
                         type = { 'text' }
                         onChange = { this.handleChange }
                         placeholder = { 'First Name' }
                         required
                  />
                  <span>
                                           </span>
                  <input name = { 'lastName' }
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
                         pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                         class={'form-control'}
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