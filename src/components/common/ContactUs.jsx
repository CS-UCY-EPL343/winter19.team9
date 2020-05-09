import React, {Component} from 'react';
import '../assets/styles/About.css';
import {sendEmail}        from '../../repository';
import ButtonLoader       from './ButtonLoader';
import Swal               from 'sweetalert2';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name   : '',
      email  : '',
      phone  : '',
      message: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = (e) => {
    if (e.target.value.match() != null) {
      this.setState({[e.target.name]: e.target.value.trim()});
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    if(this.props.testSubmit) {
      this.props.testSubmit('Testing');
      return;
    }

    if (!(
        this.state.name.match('[a-zA-Z ]+') &&
        this.state.email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$') &&
        this.state.phone.match('^ *[0-9]+.*') &&
        this.state.message.match('^ *[a-zA-Z0-9]+.*'))) {
      return;
    }

    this.setState({loading: true}, () => {
      sendEmail(this.state)
          .then((response) => {
            if (response.status === 'success') {
              Swal.fire(
                  'Message sent successfully',
                  'Check your email inbox for a confirmation.',
                  'success',
              ).then(() => window.location.reload());
            } else {
              Swal.fire(
                  'Something went wrong',
                  'Please try again...',
                  'error',
              ).then();
            }
          })
          .then(() => this.setState({loading: false}))
          .catch(() => Swal.fire(
              'Something went wrong',
              'Please try again...',
              'error',
              ).then(),
          );
    });
  };

  render() {
    return (
        <section className = "page-section" id = "contact">
          <div className = "container-fluid">
            <div className = "row">
              <div className = "col-lg-12 text-center col-md-12 col-sm-12">
                <h1 className = "section-heading">
                  Let's keep in touch
                </h1>
              </div>
            </div>
            <div className = "row">
              <div className = "col-lg-3">
                <h2>Contact Us</h2>
              </div>
            </div>
            <div className = "row">
              <div className = "col-lg-12 col-md-12 col-sm-12 text-center">
                <form
                    className = " needs-validation"
                    id = "contactForm"
                    name = "sentMessage"
                    // noValidate = "novalidate"
                    onSubmit = { this.onSubmit }
                >
                  <div className = "row mb-4">
                    <div className = "col-md-6">
                      <div className = "form-group">
                        <input
                            className = "form-control"
                            id = "name"
                            name = "name"
                            type = "text"
                            placeholder = "Name"
                            required = "required"
                            pattern = "[a-zA-Z ]+"
                            onChange = { this.handleChange }
                        />
                        <p className = "help-block text-danger" />
                        <div
                            className = "colored invalid-feedback"
                        >
                          Please enter your name!
                        </div>
                      </div>
                      <div className = "form-group">
                        <input
                            className = "form-control"
                            id = "email"
                            name = "email"
                            type = "email"
                            placeholder = "Email"
                            required = "required"
                            pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            onChange = { this.handleChange }
                        />
                        <p className = "help-block text-danger" />
                        <div className = "colored invalid-feedback">
                          Please enter a correct email!
                        </div>
                      </div>
                      <div className = "form-group">
                        <input
                            className = "form-control"
                            id = "phone"
                            name = "phone"
                            type = "tel"
                            placeholder = "Phone"
                            required = "required"
                            pattern = "^ *[0-9]+.*"
                            onChange = { this.handleChange }
                        />
                        <p className = "help-block text-danger" />
                        <div className = "colored invalid-feedback">
                          Please enter your phone!
                        </div>
                      </div>
                    </div>
                    <div className = "col-md-6">
                      <div className = "form-group">
                                            <textarea
                                                className = "form-control"
                                                id = "message"
                                                name = "message"
                                                placeholder = "Message"
                                                required = "required"
                                                pattern = "^ *[a-zA-Z0-9]+.*"
                                                onChange = { this.handleChange }
                                            />
                        <p className = "help-block text-danger" />
                        <div
                            className = "colored invalid-feedback"
                        >
                          Please enter your message!
                        </div>
                      </div>
                    </div>
                    <div className = "clearfix" />
                    <div className = "col-lg-3 ">
                      <div id = "success" />
                      <ButtonLoader loading = { this.state.loading }
                                    text = { 'Submit Message' }
                                    loadingText = { 'Sending Message...' }
                                    type = { 'submit' }
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className = "row">
              <div className = "col-lg-6 col-md-12 col-sm-12">
                <h2>Contact Information</h2>
                <p style={{marginLeft: 0}}>
                  { ' ' }
                  Address: { this.props.contact.address }
                  <br />
                  Phone: { this.props.contact.phone }
                  <br />
                  Email: { this.props.contact.email }
                  <br />
                </p>
                <br />
                <p style={{marginLeft: 0}}>
                  <a href = { this.props.contact.facebook }>
                    <i className = "fa fa-facebook" />
                  </a>
                  <a href = { this.props.contact.instagram }>
                    <i className = "fa fa-instagram" />
                  </a>
                </p>
              </div>
              <div className = "col-lg-6 col-md-12 col-sm-12 text-center">
                <div className = "mapouter">
                  <div className = "gmap_canvas">
                    <iframe
                        title = "gmap_canvas"
                        width = "550"
                        height = "400"
                        id = "gmap_canvas"
                        src = "https://maps.google.com/maps?q=fitness%20factory%20nicosia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        frameBorder = "0"
                        scrolling = "no"
                        marginHeight = "0"
                        marginWidth = "0"
                    />
                    <a href = "https://www.embedgooglemap.net/blog/divi-discount-code-elegant-themes-coupon/">
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <p />
          </div>
        </section>
    );
  }
}

export default ContactUs;
