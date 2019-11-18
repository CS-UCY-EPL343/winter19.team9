import React, {Component} from 'react';
import '../assets/styles/coaches.css'

// Images
import team1 from '../assets/img/team/marinos.jpg';
import team2 from '../assets/img/team/alekos.jpg';


class Team extends Component {
    render() {
        return (
            <section className="page-section" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading text-uppercase">Our trainers</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="timeline">
                                <li>
                                    <div className="timeline-image">
                                        <img className="rounded-circle img-fluid" src={team1} alt=""/>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                            <h4>Marinos Papakyriacou</h4>
                                        </div>
                                        <div className="timeline-body">
                                            <p className="text-muted">By combining the movement one conducts in their
                                                everyday lives, from housewives and young children to professional
                                                athletes and special forces individuals, in Fitness Factory is the
                                                ultimate workout!</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="timeline-inverted">
                                    <div className="timeline-image">
                                        <img className="rounded-circle img-fluid" src={team2} alt=""/>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                            <h4>Andreas Ketonis</h4>
                                        </div>
                                        <div className="timeline-body">
                                            <p className="text-muted">The workouts will keep you honest and force you to
                                                attack your weaknesses, making you a better all-around athlete. This is
                                                something that nearly everyone avoids when training on their own, which
                                                severely limits progress.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-image">
                                        <img className="rounded-circle img-fluid" src={team1} alt=""/>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                            <h4>Marinos Papakyriacou</h4>
                                        </div>
                                        <div className="timeline-body">
                                            <p className="text-muted">By combining the movement one conducts in their
                                                everyday lives, from housewives and young children to professional
                                                athletes and special forces individuals, in Fitness Factory is the
                                                ultimate workout!</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="timeline-inverted">
                                    <div className="timeline-image">
                                        <img className="rounded-circle img-fluid" src={team2} alt=""/>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                            <h4>Andreas Ketonis</h4>
                                        </div>
                                        <div className="timeline-body">
                                            <p className="text-muted">The workouts will keep you honest and force you to
                                                attack your weaknesses, making you a better all-around athlete. This is
                                                something that nearly everyone avoids when training on their own, which
                                                severely limits progress.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="timeline-inverted">
                                    <div className="timeline-image">
                                        <h4>Start
                                            <br/>Your Journey
                                                <br/>Now!</h4>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
    );
    }
    }

    export default Team;