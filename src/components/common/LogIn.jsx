import React   from 'react';
import '../assets/styles/SignInUp.css';
import Swal    from 'sweetalert2';
import history from '../../history';
import {isVerified, logIn, logOut} from '../../repository';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: '',
      },
      Verify    :0,
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
      if(this.props.testSubmit) {
          this.props.testSubmit('Testing');
          return;
      }

    // const crypto = require('crypto');
    // noinspection JSUnusedLocalSymbols
    // const newToken = crypto.randomBytes(10).toString('hex');

    const crypto = require('crypto');
      const hashCode = crypto.createHmac('sha256', 'ffn_private_key_!!!!')
          .update(this.state.formData.password)
          .digest('hex');
      const dataLogIn = {
      username: this.state.formData.username,
      password: hashCode,
    };


    // Call for query
    logIn(dataLogIn)
        .then(data => {
          // Error
          if (!data.level) {
            throw Error;
          }

          // Success
          this.setState({
            formData: {
              username: '',
              password: '',
            },
          }, () => {
           if(data.level==='user'){
                isVerified().then(d => {
                  this.setState({Verify : d.Verify.data[0]},
                      () => {
                          if(this.state.Verify === 1){
                            this.props.toggleModal();
                            this.props.setUserLevel('user');
                            history.push('/user/profile');
                          }else{
                            Swal.fire(
                                'This Account is not Verified yet!!',
                                'Please go and verify it!!',
                                'warning',
                            ).then(() => {logOut();});
                          }
                      });
                });
            }else{
              this.props.toggleModal();
              this.props.setUserLevel(data.level);
             history.push('/' + data.level + '/profile');
            }
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
    this.props.toggleModal();
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
          <button data-testid={'button'}>Sign in</button>
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
