import React, {Component} from 'react';
import Slider             from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/AnnouncementsPublic.css';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';
import Announcement       from './Announcement';
import AnnouncementModal  from './AnnouncementModal';

class AnnouncementsPublic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            modal        : false,
        };
        this.slickAdd = this.slickAdd.bind(this);
        this.slickRemove = this.slickRemove.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    slickAdd = (title, message) => {
        if (title === '' || message === '') {
            alert('Please give correct data.');
            return;
        }

        this.toggle();
        let newID = 1;
        if (this.state.announcements.length > 0) {
            newID = this.state.announcements.reduce((prev, current) => (
                                                                           prev.id
                                                                           > current.id)
                                                                       ? prev
                                                                       : current).id
                    + 1;
        }

        console.log(newID);
        this.state.announcements.push(
            {id: newID, title: title, message: message});
    };

    slickRemove = (id) => {
        this.setState({
                          announcements: this.state.announcements.filter(
                              ann => ann.id !== id),
                      });
    };

    render() {
        const settings = {
            dots          : true,
            infinite      : false,
            speed         : 300,
            slidesToShow  : 4,
            slidesToScroll: 4,
            centerPadding : 0,
            centerMode    : false,
            responsive    : [
                {
                    breakpoint: 1024,
                    settings  : {
                        slidesToShow  : 3,
                        slidesToScroll: 3,
                        infinite      : true,
                        dots          : true,
                    },
                },
                {
                    breakpoint: 800,
                    settings  : {
                        slidesToShow  : 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 600,
                    settings  : {
                        slidesToShow  : 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };
        return (
            <div id = 'AnnouncementsPub'>
                <AnimatedOnScroll animationIn = "fadeInLeft">
                    <div id = "ann-container"
                         className = "container-fluid mt-2"
                    >
                        <h1 className = "ann-title">Announcements</h1>
                        <div className = "row">
                            <div className = "col-lg-12">
                                <div className = "ann-cards">
                                    <Slider { ...settings }>
                                        <Announcement isAdder = { true }
                                                      id = { 0 }
                                                      slickAdd = { this.toggle }
                                        />
                                        { this.state.announcements.length === 0
                                          &&
                                          <Announcement isAdder = { true }
                                                        id = { 0 }
                                                        slickAdd = { this.toggle }
                                          /> }
                                        { this.state.announcements.length <= 1
                                          &&
                                          <Announcement isAdder = { true }
                                                        id = { 0 }
                                                        slickAdd = { this.toggle }
                                          /> }
                                        { this.state.announcements.length <= 2
                                          &&
                                          <Announcement
                                              isAdder = { true }
                                              id = { 0 }
                                              slickAdd = { this.toggle }
                                          /> }

                                        { this.state.announcements.sort(
                                            function(a, b) {
                                                return b.id - a.id;
                                            }).map(ann => {
                                            return <Announcement key = { ann.id }
                                                                 isAdder = { false }
                                                                 id = { ann.id }
                                                                 title = { ann.title }
                                                                 message = { ann.message }
                                                                 slickRemove = { this.slickRemove }
                                            />;
                                        }) }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedOnScroll>

                <AnnouncementModal onSubmit = { this.slickAdd }
                                   toggle = { this.toggle }
                                   modal = { this.state.modal }
                />
            </div>
        );
    }
}

export default AnnouncementsPublic;