import React                                    from 'react';
import {ValidatorForm}                          from 'react-material-ui-form-validator';
import TextField
                                                from '@material-ui/core/TextField';
import Radio                                    from '@material-ui/core/Radio';
import RadioGroup
                                                from '@material-ui/core/RadioGroup';
import FormControlLabel
                                                from '@material-ui/core/FormControlLabel';
import FormControl
                                                from '@material-ui/core/FormControl';
import Recaptcha                                from 'react-recaptcha';
import Swal                                     from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import '../assets/styles/SignInUp.css';
import {insertAdmin, insertCoach, sameUsername} from '../../repository';

class CreateStaffMember extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData  : {
        fname           : '',
        lname           : '',
        username        : '',
        email           : '',
        password        : '',
        confirm_password: '',
        bdate           : '',
        gender          : '',
        age             : '',
      },
      isVerified: false,
      submitted : false,
      countTotal: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.calcDate = this.calcDate.bind(this);
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    // noinspection JSUnresolvedFunction
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      const {formData} = this.state;
      return value === formData.password;
    });
  }

  handleChange = event => {
    const {formData} = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({formData});

    if (event.target.name === 'bdate') {
      this.calcDate(event);
    }

    if (
        event.target.name === 'password' &&
        !event.target.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    ) {
      event.target.setCustomValidity(
          'Enter a combination of at least 8 numbers, lower and uppercase letters.',
      );
    } else if (
        event.target.name === 'confirm_password' &&
        event.target.value !== this.state.formData.password
    ) {
      event.target.setCustomValidity('Passwords don\'t match.');
    } else {
      event.target.setCustomValidity('');
    }
  };

  verifyCallback = response => {
    if (response) {
      this.setState({isVerified: true});
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (
        !this.state.formData.fname ||
        !this.state.formData.lname ||
        !this.state.formData.username ||
        !this.state.formData.bdate ||
        !this.state.formData.gender ||
        !this.state.formData.email.match(
            /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        ) ||
        !this.state.formData.password.match(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        ) ||
        this.state.formData.confirm_password !== this.state.formData.password
    ) {
      return;
    }
    if (!this.state.isVerified) {
      Swal.fire(
          'Please verify that you are not a robot 🤖!!!',
          '',
          'error',
      ).then();
      return;
    }

    const crypto = require('crypto');

    const hashCode = crypto.createHmac('sha256', 'ffn_private_key_!!!!')
        .update(this.state.formData.password)
        .digest('hex');
    // Create output query
    const data = {
      username: this.state.formData.username,
      password: hashCode,
      fname   : this.state.formData.fname,
      lname   : this.state.formData.lname,
      email   : this.state.formData.email,
      age     : this.state.formData.age,
      gender  : this.state.formData.gender === 'male' ? 1 : 2,
      level   : this.state.formData.level,
      bDate   : this.state.formData.bdate,
    };

    sameUsername(this.state.formData.username)
        .then(response => {
          this.setState(
              {countTotal: response.countTotal},
              () => {
                if (this.state.countTotal === 1) {
                  Swal.fire(
                      'Someone else has this username!!!',
                      '',
                      'error',
                  ).catch(() => Swal.fire(
                      'Something go wrong!!',
                      'Please try again...',
                      'error',
                  ));
                } else if (this.props.staffType === 'coach') {
                  insertCoach(data).then((response) => {
                    const Account_ID = response.Account_ID;
                    Swal.fire(
                        'Coach Created successfully',
                        '',
                        'success',
                    ).then(() => {
                      // noinspection JSUnresolvedVariable
                      let newStaff = {
                        AccountID: Account_ID,
                        Bdate    : this.state.formData.bdate,
                        Email    : this.state.formData.email,
                        Gender   : this.state.formData.gender === 'male'
                            ? 1
                            : 2,
                        Name     : this.state.formData.fname,
                        Surname  : this.state.formData.lname,
                        level    : this.state.formData.level,
                        username : this.state.formData.username,
                      };
                      this.props.onSuccess(newStaff, 'coach',
                          this.props.coaches, this.props.admins);
                      this.props.toggle();
                    });
                  }).catch(() => Swal.fire(
                      'Something went wrong',
                      'Please try again...',
                      'error',
                  ));
                } else if (this.props.staffType === 'admin') {

                  insertAdmin(data).then((response) => {
                    const Account_ID = response.Account_ID;
                    Swal.fire(
                        'Admin Created successfully',
                        '',
                        'success',
                    ).then(() => {
                      // noinspection JSUnresolvedVariable
                      let newStaff = {
                        AccountID: Account_ID,
                        Bdate    : this.state.formData.bdate,
                        Email    : this.state.formData.email,
                        Gender   : this.state.formData.gender === 'male'
                            ? 1
                            : 2,
                        Name     : this.state.formData.fname,
                        Surname  : this.state.formData.lname,
                        level    : this.state.formData.level,
                        username : this.state.formData.username,
                      };
                      this.props.onSuccess(newStaff, 'admin',
                          this.props.coaches, this.props.admins);
                      this.props.toggle();
                    });
                  }).catch(() => Swal.fire(
                      'Something went wrong',
                      'Please try again...',
                      'error',
                  ));
                }
              },
          );
        });

  };

  calcDate = (dDate) => {
    let thenD = dDate.target.value;
    let str = thenD.split('-');
    let now = new Date();
    let ageDif = now.getFullYear() - str[0];

    const {formData} = this.state;
    formData.age = ageDif;
    this.setState({formData});
  };

  render() {
    // noinspection JSUnresolvedVariable
    return (
        <form id = "signup"
              onSubmit = { this.handleSubmit }
              autoComplete = "off"
        >
          <input
              placeholder = "First Name"
              name = "fname"
              type = "text"
              value = { this.state.formData.fname }
              required
              onChange = { this.handleChange }
              style = { {marginTop: 0} }
          />
          <input
              placeholder = "Last Name"
              name = "lname"
              type = "text"
              value = { this.state.formData.lname }
              required
              onChange = { this.handleChange }
          />
          <input
              placeholder = "Email Address"
              name = "email"
              type = "email"
              value = { this.state.formData.email }
              onChange = { this.handleChange }
              pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
          />
          <input
              placeholder = "Username"
              name = "username"
              type = "text"
              value = { this.state.formData.username }
              required
              onChange = { this.handleChange }
          />
          <input
              placeholder = "Password"
              name = "password"
              type = "password"
              value = { this.state.formData.password }
              required
              pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange = { this.handleChange }
          />
          <input
              placeholder = "Confirm Password"
              name = "confirm_password"
              type = "password"
              value = { this.state.formData.confirm_password }
              required
              pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange = { this.handleChange }
          />
          <TextField
              placeholder = "Birthday"
              name = "bdate"
              type = "date"
              value = { this.state.formData.bday }
              InputLabelProps = { {
                shrink: true,
              } }
              onChange = { this.handleChange }
              required
          />
          <br />
          <FormControl component = "fieldset">
            {/* <FormLabel component="legend">Gender</FormLabel> */ }
            <RadioGroup
                aria-label = "gender"
                name = "gender"
                value = { this.state.formData.gender }
                onChange = { this.handleChange }
                className = { 'gender-radio' }
            >
              <FormControlLabel
                  value = "male"
                  control = { <Radio required /> }
                  label = "Male"
              />
              <FormControlLabel
                  value = "female"
                  control = { <Radio required /> }
                  label = "Female"
              />
            </RadioGroup>
          </FormControl>
          <Recaptcha
              elementID = { 'g-recaptcha' }
              sitekey = "6Lf0od8UAAAAAFoog9iFIpVd8rcPxBwHpUKpnCua"
              size = "normal"
              render = "explicit"
              theme = "dark"

              verifyCallback = { this.verifyCallback }
          />
          <button style = { {marginBottom: '15px'} }>Sign up</button>
          <br />
        </form>
    );
  }
}

export default CreateStaffMember;