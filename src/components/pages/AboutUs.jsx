import React, { Component } from "react";
import ContactUs from "../common/ContactUs";
import Team from "../common/Team";
import {updateAboutUdVisit} from "../../repository";

class AboutUs extends Component {

    componentDidMount() {
        updateAboutUdVisit().then();
    }

    render() {
        return (
            <div id={"about-us"}>
                <Team />
                <ContactUs />
            </div>
        );
    }
}

export default AboutUs;
