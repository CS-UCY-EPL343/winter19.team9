import React, {Component} from 'react';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';
import '../assets/styles/AnnouncmentsPrivate.css'
import Announcement from "./Announcement";
import {userData} from "../../repository";



class AnnouncementsPrivate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            Text: '',
            TIMESTAMP: '',
            coachName: '',
        };
    }


    componentDidMount() {
        userData()
            .then(response => {console.log(response);this.setState(response)})
    }

    render() {
        return (
            <div className="Announcements" id="AnnounceModal">
                <AnimatedOnScroll animationIn="fadeInLeft">
                    <div id="ann" className="container mt-2">
                        <Announcement level={-1} title={'Announcement'}
                                      message={'This is a sample text to show how the announcement section in our web app will work.'}/>
                        <Announcement level={-1} title={'Announcement'}
                                      message={'This is a sample text to show how the announcement section in our web app will work.'}/>
                        <Announcement level={-1} title={'Announcement'}
                                      message={'This is a sample text to show how the announcement section in our web app will work.'}/>
                        <Announcement level={-1} title={'Announcement'}
                                      message={'This is a sample text to show how the announcement section in our web app will work.'}/>
                        <Announcement level={-1} title={'Announcement'}
                                      message={'This is a sample text to show how the announcement section in our web app will work.'}/>
                    </div>
                </AnimatedOnScroll>
            </div>
        )
            ;
    }
}

export default AnnouncementsPrivate;