import React, {Component} from 'react';
import '../assets/styles/About.css';
import {sendEmail}        from '../../repository';


class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name   : '',
      email  : '',
      phone  : '',
      message: '',
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

    if (!(
        this.state.name.match('[a-zA-Z ]+') &&
        this.state.email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$') &&
        this.state.phone.match('^ *[0-9]+.*') &&
        this.state.message.match('^ *[a-zA-Z0-9]+.'))) {
      return;
    }

    sendEmail(this.state).then((response) => {
      if (response.status === 'success') {
        alert('Message Sent.');
        window.location.reload();
      } else if (response.status === 'fail') {
        alert('Message failed to send.');
      }
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
                    noValidate = "novalidate"
                    onSubmit = { this.onSubmit }
                >
                  <div className = "row">
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
                            type = "text"
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
                      <button
                          id = "sendMessageButton"
                          className = "btn btn-primary btn-xl text-uppercase"
                          type = "submit"
                      >
                        Submit Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className = "row">
              <div className = "col-lg-6 col-md-12 col-sm-12">
                <h2>Contact Information</h2>
                <p>
                  { ' ' }
                  Address: Engomi 2409 - Nicosia
                  <br />
                  Phone: 22-260001
                  <br />
                  Email: info@fitnessfactorynic.com.cy
                  <br/>
                </p>
                <p>
                  <a href = "https://www.facebook.com/fitnessfactorynicosia/">
                    <i className = "fa fa-facebook" />
                  </a>
                  <a href = "https://www.instagram.com/fitness_factory_nicosia/">
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
