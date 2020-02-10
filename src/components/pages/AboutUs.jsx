import React, { Component } from "react";
import ContactUs from "../common/ContactUs";
import Team from "../common/Team";

class AboutUs extends Component {
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
