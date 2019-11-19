import React, {Component} from 'react';
import '../assets/styles/coaches.css'

// Images
import team1 from '../assets/img/coaches/69423072_3238381526187039_3449618990849064960_o.jpg';
import TeamMember from "./TeamMember";

const coaches = [

    {className: '', src: team1, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
                                    'everyday lives, from housewives and young children to professional ' +
                                    'athletes and special forces individuals, in Fitness Factory is the ' +
                                    'ultimate workout!'},
    {className: 'timeline-inverted', src: team1, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
            'everyday lives, from housewives and young children to professional ' +
            'athletes and special forces individuals, in Fitness Factory is the ' +
            'ultimate workout!'},
    {className: '', src: team1, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
            'everyday lives, from housewives and young children to professional ' +
            'athletes and special forces individuals, in Fitness Factory is the ' +
            'ultimate workout!'},
    {className: 'timeline-inverted', src: team1, name: 'Alekos', text: 'By combining the movement one conducts in their ' +
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