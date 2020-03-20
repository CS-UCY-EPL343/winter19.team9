import React, {Component}                  from 'react';
import ContactUs                           from '../common/ContactUs';
import Team                                from '../common/Team';
import {loggedInVisit, updateAboutUsVisit} from '../../repository';

class AboutUs extends Component {

  componentDidMount() {
    loggedInVisit().then();
    updateAboutUsVisit().then();
  }

  render() {
    return (
        <div id = { 'about-us' }>
          <Team />
          <ContactUs />
        </div>
    );
  }
}

export default AboutUs;
