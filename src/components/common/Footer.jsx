import React, {Component} from 'react';
import {NavLink}          from 'react-router-dom';
import '../assets/styles/homePage.css';
import * as Icons         from '@fortawesome/fontawesome-free-solid';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';

class Footer extends Component {
  render() {
    // noinspection HtmlUnknownTarget
    return (
        // Footer
        <footer>
          <div id = "footer" className = "information container-fluid">
            <div className = "row justify-content-center">
              <div id = "socials-footer"
                   className = "col-lg-3 col-md-12 col-sm-12"
              >
                <h2>Get Social</h2>
                <p data-testid = { 'text' }>{ this.props.stylesheetData['social']['text'] }</p>
                <br />
                <p>
                  <a data-testid = { 'facebook' }
                     href = { this.props.stylesheetData['social']['facebook'] }
                  >
                    <i className = "fa fa-facebook footer-icon" />
                  </a>
                  <a data-testid = { 'instagram' }
                     href = { this.props.stylesheetData['social']['instagram'] }
                  >
                    <i className = "fa fa-instagram footer-icon footer-icon-centered" />
                  </a>
                </p>
              </div>
              <div id = "about-footer"
                   className = "col-lg-3 col-md-12 col-sm-12"
              >
                <h2>About Us</h2>
                <p>
                  <i className = "fa fa-map-marker footer-icon" /> Address:
                  <span data-testid = { 'address' }
                        className = "about-footer-text"
                  > { this.props.stylesheetData['about-us']['address'] }</span>
                </p>
                <br />
                <p>
                  <i className = "fa fa-envelope footer-icon" />
                  <span data-testid = { 'email' }
                        className = "about-footer-text"
                  > { this.props.stylesheetData['about-us']['email'] }</span>
                </p>
              </div>
              { !this.props.testLoading &&
                <div id = "help-footer"
                     className = "col-lg-3 col-md-12 col-sm-12"
                >
                  <h2>Get Help</h2>
                  <div>
                    <p><i className = "fa fa-home footer-icon" /> <NavLink
                        className = "Nav_link"
                        to = "/"
                    >Home Page</NavLink></p>
                  </div>
                  <div>
                    <p><i className = "fa fa-phone footer-icon" /> <NavLink
                        className = "Nav_link"
                        to = "/about"
                    >Contact Us</NavLink></p>
                  </div>
                  <div>
                    <p><i className = "fa fa-info footer-icon" /> <NavLink
                        className = "Nav_link"
                        to = "/classes"
                    >See the classes</NavLink></p>
                  </div>
                </div>
              }
              <div id = "about-footer"
                   className = "col-lg-3 col-md-12 col-sm-12"
              >
                <h2>About The Club</h2>
                { this.props.stylesheetData['about-club'].map((v, i) => {
                  return (
                      <div data-testid = { 'about-club' }
                           key = { i }
                           style = { {padding: 0} }
                      >
                        <p>{ v }</p>
                      </div>
                  );
                }) }
              </div>
            </div>
          </div>
          <div id = "copyrights" className = "container-fluid">
            <div className = "row justify-content-center">
              <p><FontAwesomeIcon icon = { Icons.faCopyright }
                                  size = "sm"
              /> Copyrights Fitness Factory Nicosia</p>
            </div>
          </div>
        </footer>

    );
  }
}

export default Footer;