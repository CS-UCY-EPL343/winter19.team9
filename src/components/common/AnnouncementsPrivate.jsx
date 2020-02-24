import React, {Component} from 'react';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';
import '../assets/styles/AnnouncmentsPrivate.css'
import AnnouncementCompPub from './AnnouncementCompPub';
import {getPrivateAnnouncements} from "../../repository";


class AnnouncementsPrivate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            level: -1,
        };
    }


    componentDidMount() {

        this.setState({level: -1});

        getPrivateAnnouncements().then(response => {
            this.setState(
                {announcements: response.data.announcements});
        });
    }

    render() {
        return (
            <div className="Announcements" id="AnnounceModal">
                <AnimatedOnScroll animationIn="fadeInLeft">
                    <div id="ann" className="container mt-2">
                        {this.state.announcements.sort(
                            function (a, b) {
                                return b.ANNOUNCEMENT_ID
                                    - a.ANNOUNCEMENT_ID;
                            }).map(ann => {
                            return <AnnouncementCompPub key={ann.ANNOUNCEMENT_ID}
                                                        id={ann.ANNOUNCEMENT_ID}
                                                        title={ann.Title}
                                                        message={ann.Message}
                                                        level={this.state.level}
                            />;
                        })}
                    </div>
                </AnimatedOnScroll>
            </div>
        )
            ;
    }
}

export default AnnouncementsPrivate;