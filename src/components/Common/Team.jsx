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

    {className: '', src: coach1, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
                                    'everyday lives, from housewives and young children to professional ' +
                                    'athletes and special forces individuals, in Fitness Factory is the ' +
                                    'ultimate workout!'},
    {className: 'timeline-inverted', src: coach2, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
            'everyday lives, from housewives and young children to professional ' +
            'athletes and special forces individuals, in Fitness Factory is the ' +
            'ultimate workout!'},
    {className: '', src: coach3, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
            'everyday lives, from housewives and young children to professional ' +
            'athletes and special forces individuals, in Fitness Factory is the ' +
            'ultimate workout!'},
    {className: 'timeline-inverted', src: coach4, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
            'everyday lives, from housewives and young children to professional ' +
            'athletes and special forces individuals, in Fitness Factory is the ' +
            'ultimate workout!'},
    {className: '', src: coach5, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
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