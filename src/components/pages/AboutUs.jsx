import React, {Component}                  from 'react';
import ContactUs                           from '../common/ContactUs';
import Team                                from '../common/Team';
import {loggedInVisit, updateAboutUsVisit} from '../../repository';
import PrivacyPolicy                                from './PrivacyPolicy';

class AboutUs extends Component {
    componentDidMount() {
        loggedInVisit().then();
        updateAboutUsVisit().then();
    }

    render() {
        return (
            <div id = { 'about-us' }>
                <Team coaches = { this.props.stylesheetData['About']['coach'] } />
                <ContactUs contact = { this.props.stylesheetData['About']['contact'] } />
                <PrivacyPolicy/>
            </div>
        );
    }
}

export default AboutUs;
