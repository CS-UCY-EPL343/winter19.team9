import React, { Component } from 'react';
import '../assets/styles/homePage.css'
import ServiceGoal          from './ServiceGoal';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
// Images
import bgImage              from '../../logo.svg';

class Services extends Component {
    render() {
        return (
            <div id = { 'our-services' }>
                <div className = "container">
                    <div className = "row">
                        <div className = "col-lg-12">
                            <div className = "service-title text-center padding-bottom-35">
                                <p className = "subtitle">Service we provide</p>
                                <h1 className = "title">Our Services</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className = { 'service-area' }>
                    <div className = { 'container' }>
                        <div className = { 'row' }>
                            <AnimatedOnScroll animationInDelay={500} animationIn = "zoomInRight" style = { {
                                position : 'absolute',
                                height   : 500,
                                width    : 500,
                                top      : '50%',
                                left     : '50%',
                                transform: 'translate(-50%, -50%)'
                            } }
                            >
                                <img className = { 'bgImage' } src = { bgImage } alt = { 'Background' } />
                            </AnimatedOnScroll>

                            <AnimatedOnScroll animationIn = "fadeInLeft">
                                <div className = { 'col-lg-12' }>
                                    <div className = { 'row d-flex justify-content-between' }>
                                        <ServiceGoal
                                            icon = { 'fas fa-dumbbell' }
                                            title = { 'Equipment' }
                                            message = { 'This is a message, im too bored to think of a message so im writing '
                                                        + 'this fake message.' }
                                        />

                                        <ServiceGoal
                                            icon = { 'fas fa-dumbbell' }
                                            title = { 'Equipment' }
                                            message = { 'This is a message, im too bored to think of a message so im writing '
                                                        + 'this fake message.' }
                                        />
                                    </div>
                                </div>
                            </AnimatedOnScroll>

                            <AnimatedOnScroll animationIn = "fadeInRight">
                                <div className = { 'col-lg-12' }>
                                    <div className = { 'row d-flex justify-content-between' }>
                                        <ServiceGoal
                                            icon = { 'fas fa-dumbbell' }
                                            title = { 'Equipment' }
                                            message = { 'This is a message, im too bored to think of a message so im writing '
                                                        + 'this fake message.' }
                                        />

                                        <ServiceGoal
                                            icon = { 'fas fa-dumbbell' }
                                            title = { 'Equipment' }
                                            message = { 'This is a message, im too bored to think of a message so im writing '
                                                        + 'this fake message.' }
                                        />
                                    </div>
                                </div>
                            </AnimatedOnScroll>

                            <AnimatedOnScroll animationIn = "fadeInLeft">
                                <div className = { 'col-lg-12' }>
                                    <div className = { 'row d-flex justify-content-between' }>
                                        <ServiceGoal
                                            icon = { 'fas fa-dumbbell' }
                                            title = { 'Equipment' }
                                            message = { 'This is a message, im too bored to think of a message so im writing '
                                                        + 'this fake message.' }
                                        />

                                        <ServiceGoal
                                            icon = { 'fas fa-dumbbell' }
                                            title = { 'Equipment' }
                                            message = { 'This is a message, im too bored to think of a message so im writing '
                                                        + 'this fake message.' }
                                        />
                                    </div>
                                </div>
                            </AnimatedOnScroll>
                        </div>
                    </div>
                </div>
                <div className = { 'Announcements' }>
                    <AnimatedOnScroll animationIn = "fadeInLeft">
                        <div id="ann" className="container mt-2">
                            <h1 id = "Announcements">Announcements</h1>
                            <div className="row">
                                <div className="col-md-3 col-sm-6">
                                    <div className="card card-block">

                                        <h5 className="card-title mt-3 mb-3">Announcement 1</h5>

                                        <p className="card-text">This is a sample text to show how the announcement section in our web app will work.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="card card-block">

                                        <h5 className="card-title  mt-3 mb-3">Announcement 2</h5>

                                        <p className="card-text">This is a sample text to show how the announcement section in our web app will work.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="card card-block">

                                        <h5 className="card-title  mt-3 mb-3">Announcement 3</h5>

                                        <p className="card-text">This is a sample text to show how the announcement section in our web app will work.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="card card-block">

                                        <h5 className="card-title  mt-3 mb-3">Announcement 4</h5>

                                        <p className="card-text">This is a sample text to show how the announcement section in our web app will work.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedOnScroll>
                </div>
            </div>

        );
    }
}

export default Services;