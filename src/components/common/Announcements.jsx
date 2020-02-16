import React, { Component } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import '../assets/styles/announcementModal.css'

class Announcements extends Component {
    render() {
        const express = require('express');
        const cors =  require('cors');
        const mysql = require('mysql');

        return (
            <div className = "Announcements" id = "AnnounceModal">
                <AnimatedOnScroll animationIn = "fadeInLeft">
                    <div id = "ann" className = "container mt-2">
                        <div className = "row">
                            <div className = "col-md-12 col-sm-12">
                                <div className = "card card-block">

                                    <h5 className = "card-title mt-3 mb-3">Announcement 1</h5>

                                    <p className = "card-text">This is a sample text to show how the
                                        announcement section in our web app will work.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-md-12 col-sm-12">
                                <div className = "card card-block">

                                    <h5 className = "card-title  mt-3 mb-3">Announcement 2</h5>

                                    <p className = "card-text">This is a sample text to show how the
                                        announcement section in our web app will
                                        work.</p>
                                </div>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-md-12 col-sm-12">
                                <div className = "card card-block">

                                    <h5 className = "card-title  mt-3 mb-3">Announcement 3</h5>

                                    <p className = "card-text">This is a sample text to show how the
                                        announcement section in our web app will
                                        work.</p>
                                </div>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-md-12 col-sm-12">
                                <div className = "card card-block">

                                    <h5 className = "card-title  mt-3 mb-3">Announcement 4</h5>

                                    <p className = "card-text">This is a sample text to show how the
                                        announcement section in our web app will
                                        work.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedOnScroll>
            </div>
        )
            ;
    }
}

export default Announcements;