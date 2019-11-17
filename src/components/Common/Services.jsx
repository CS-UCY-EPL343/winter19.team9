import React, { Component } from 'react';
import '../assets/styles/homePage.css'
import ServiceGoal          from './ServiceGoal';

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
                            <div className = { 'col-lg-12' }>
                                <div className = { 'row d-flex justify-content-between' }>
                                    <ServiceGoal
                                        icon={'fas fa-dumbbell'}
                                        title={'Equipment'}
                                        message={'This is a message, im too bored to think of a message so im writing '
                                                 + 'this fake message.'}
                                    />

                                    <ServiceGoal
                                        icon={'fas fa-dumbbell'}
                                        title={'Equipment'}
                                        message={'This is a message, im too bored to think of a message so im writing '
                                                 + 'this fake message.'}
                                    />
                                </div>
                            </div>

                            <div className = { 'col-lg-12' }>
                                <div className = { 'row d-flex justify-content-between' }>
                                    <ServiceGoal
                                        icon={'fas fa-dumbbell'}
                                        title={'Equipment'}
                                        message={'This is a message, im too bored to think of a message so im writing '
                                                 + 'this fake message.'}
                                    />

                                    <ServiceGoal
                                        icon={'fas fa-dumbbell'}
                                        title={'Equipment'}
                                        message={'This is a message, im too bored to think of a message so im writing '
                                                 + 'this fake message.'}
                                    />
                                </div>
                            </div>

                            <div className = { 'col-lg-12' }>
                                <div className = { 'row d-flex justify-content-between' }>
                                    <ServiceGoal
                                        icon={'fas fa-dumbbell'}
                                        title={'Equipment'}
                                        message={'This is a message, im too bored to think of a message so im writing '
                                                 + 'this fake message.'}
                                    />

                                    <ServiceGoal
                                        icon={'fas fa-dumbbell'}
                                        title={'Equipment'}
                                        message={'This is a message, im too bored to think of a message so im writing '
                                                 + 'this fake message.'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Services;