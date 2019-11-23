import React, {Component} from 'react';
import '../assets/styles/classes.css';

class Classes extends Component {
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
                                        <img src="../assets/img/classes/classes-1.jpg" className="rounded-corners" alt=""/>
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
                                        <img src="../assets/img/classes/classes-2.jpg" className="rounded-corners" alt=""/>
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
                                        <img src="../assets/img/classes/classes-3.jpg" className="rounded-corners" alt=""/>
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
                                        <img src="../assets/img/classes/classes-4.jpg" className="rounded-corners" alt=""/>
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
                                        <img src="../assets/img/classes/classes-5.jpg" className="rounded-corners" alt=""/>
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
                                        <img src="../assets/img/classes/classes-6.jpg" className="rounded-corners" alt=""/>
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
                </section>
        );
    }
}

export default Classes;