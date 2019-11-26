import React, {Component} from 'react';
import '../assets/styles/coaches.css'

// Images
import coach1 from '../assets/img/coaches/coach1.jpg';
import coach2 from '../assets/img/coaches/coach2.jpg';
import coach3 from '../assets/img/coaches/coach3.jpg';
import coach4 from '../assets/img/coaches/coach4.jpg';
import coach5 from '../assets/img/coaches/coach5.jpg';
import TeamMember from "./TeamMember";

const coaches = [

    {className: '', src: coach1, name: 'Andreas Evagorou', text: 'By combining the movement one conducts in their ' +
                                    'everyday lives, from housewives and young children to professional ' +
                                    'athletes and special forces individuals, in Fitness Factory is the ' +
                                    'ultimate workout!'},
    {className: 'timeline-inverted', src: coach2, name: 'Marinos Papakyriakou', text: 'The workouts will keep you honest and ' +
            'force you to attack your weaknesses, making you a better all-around ' +
            'athlete. This is something that nearly everyone avoids when training ' +
            'on their own, which severely limits progress.'},
    {className: '', src: coach3, name: 'Giorgos Frantzeskos', text: 'By combining the movement one conducts in their ' +
            'everyday lives, from housewives and young children to professional ' +
            'athletes and special forces individuals, in Fitness Factory is the ' +
            'ultimate workout!'},
    {className: 'timeline-inverted', src: coach4, name: 'Andreas Ketwnis', text: 'The workouts will keep you honest and ' +
            'force you to attack your weaknesses, making you a better all-around ' +
            'athlete. This is something that nearly everyone avoids when training ' +
            'on their own, which severely limits progress.'},
    {className: '', src: coach5, name: 'Constantinos Christos', text: 'By combining the movement one conducts in their ' +
            'everyday lives, from housewives and young children to professional ' +
            'athletes and special forces individuals, in Fitness Factory is the ' +
            'ultimate workout!'}

];

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

                                {coaches.map((coach, index) => {
                                    return (<TeamMember
                                        key={index}
                                        {...coach}
                                    />);
                                })}

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