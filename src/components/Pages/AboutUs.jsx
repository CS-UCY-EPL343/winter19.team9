import React, {Component} from 'react';
import ContactUs from "../Common/ContactUs";
import Team from "../Common/Team";

class AboutUs extends Component {
    render() {
        return (
            <div id={'about-us'}>
                <Team/>
                <ContactUs/>
            </div>
        );
    }
}

export default AboutUs;