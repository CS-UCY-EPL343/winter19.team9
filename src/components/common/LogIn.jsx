import React   from 'react';
import '../assets/styles/SignInUp.css';
import Swal    from 'sweetalert2';
import history from '../../history';
import {logIn} from '../../repository';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  handleChange = event => {
    const {formData} = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({formData});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Call for query
    logIn(this.state.formData)
        .then(data => {
          // Error
          if (!data.level) {
            throw Error;
          }
          // Success
          Swal.fire(
              'Successful log in',
              '',
              'success',
          ).then(() => {
            // Reset
            this.setState({
              formData: {
                username: '',
                password: '',
              },
            }, () => {
              this.props.toggleModal();
              this.props.setUserLevel(data.level);
              history.push('/');
            });
          });
        }).catch(() => Swal.fire(
        'Something went wrong',
        'Please try again...',
        'error',
    ));
  };

  rotate = () => {
    this.setState({
      formData : {
        username: '',
        password: '',
      },
      submitted: false,
    });
    this.props.rotate();
  };

  forgotPassword = () => {
    history.push('/forgotPassword');
  };

  render() {
    return (
        <form id = "login"
              onSubmit = { this.handleSubmit }
              autoComplete = "off"
        >
          <h1>Sign in</h1>
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
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange = { this.handleChange }
          />
          <p className = { 'forgot-passsword' }
             onClick = { this.forgotPassword }
          >Forgot your password?</p>
          <button>Sign in</button>
          <br />
          <span className = "login rotateForms" onClick = { this.rotate }>
            <i className = "fa fa-user-plus" />
            Sign up
          </span>
        </form>
    );
  }
}

export default Signup;
