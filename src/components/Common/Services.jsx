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
                            <AnimatedOnScroll animationInDelay="500" animationIn = "zoomInRight" style = { {
                                position : 'absolute',
                                height   : 500,
                                width    : 500,
                                top      : '50%',
                                left     : '50%',
                                transform: 'translate(-50%, -50%)'
                            } }
                            >
                                <img className = { 'bgImage' } src = { bgImage } alt = { 'Image' } />
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
            </div>

        );
    }
}

export default Services;