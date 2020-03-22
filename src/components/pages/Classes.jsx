import React, {Component} from 'react';
import '../assets/styles/classes.css';
import class1 from '../assets/img/classes/classes-1.jpg';
import class2 from '../assets/img/classes/classes-2.jpg';
import class3 from '../assets/img/classes/classes-3.jpg';
import class4 from '../assets/img/classes/classes-4.jpg';
import class5 from '../assets/img/classes/classes-5.jpg';
import class6 from '../assets/img/classes/classes-6.jpg';
import timetableimg from '../assets/img/classes/unnamed.png';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import {updateClassesVisit} from "../../repository";



class Classes extends Component {

    componentDidMount() {
        updateClassesVisit().then();
    }


    render() {
        return (
                <section className="classes-section" id="classes">
                    <div className="container">
                        <div className="page-title">
                            <h1>Our Classes</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="single-classes" id="single-classes">
                                    <div className="classes-img">
                                        <img src={class1} className="rounded-corners" alt=""/>
                                    </div>
                                    <div className="classes-text">
                                        <h5>Pilates</h5>
                                        <p>Pellentesque dictum nisl in nibh dictum volutpat nec a quam. Vivamus suscipit
                                            nisl quis
                                            nulla pretium, vitae ornare leo.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-classes" id="single-classes">
                                    <div className="classes-img">
                                        <img src={class2} className="rounded-corners" alt=""/>
                                    </div>
                                    <div className="classes-text">
                                        <h5>Body Building</h5>
                                        <p>Pellentesque dictum nisl in nibh dictum volutpat nec a quam. Vivamus suscipit
                                            nisl quis
                                            nulla pretium, vitae ornare leo.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-classes" id="single-classes">
                                    <div className="classes-img">
                                        <img src={class3} className="rounded-corners" alt=""/>
                                    </div>
                                    <div className="classes-text">
                                        <h5>Fitness</h5>
                                        <p>Pellentesque dictum nisl in nibh dictum volutpat nec a quam. Vivamus suscipit
                                            nisl quis
                                            nulla pretium, vitae ornare leo.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-classes" id="single-classes">
                                    <div className="classes-img">
                                        <img src={class4} className="rounded-corners" alt=""/>
                                    </div>
                                    <div className="classes-text">
                                        <h5>Yoga</h5>
                                        <p>Pellentesque dictum nisl in nibh dictum volutpat nec a quam. Vivamus suscipit
                                            nisl quis
                                            nulla pretium, vitae ornare leo.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-classes" id="single-classes">
                                    <div className="classes-img">
                                        <img src={class5} className="rounded-corners" alt=""/>
                                    </div>
                                    <div className="classes-text">
                                        <h5>Trx</h5>
                                        <p>Pellentesque dictum nisl in nibh dictum volutpat nec a quam. Vivamus suscipit
                                            nisl quis
                                            nulla pretium, vitae ornare leo.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-classes" id="single-classes">
                                    <div className="classes-img">
                                        <img src={class6} className="rounded-corners" alt=""/>
                                    </div>
                                    <div className="classes-text">
                                        <h5>Spinning</h5>
                                        <p>Pellentesque dictum nisl in nibh dictum volutpat nec a quam. Vivamus suscipit
                                            nisl quis
                                            nulla pretium, vitae ornare leo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AnimatedOnScroll animationIn = "zoomInUp">
                        <div className = 'container'>
                            <div className = 'full-width-image'>
                               <img src = {timetableimg} alt="timetable"/>
                            </div>
                        </div>
                    </AnimatedOnScroll>
                </section>
        );
    }
}

export default Classes;