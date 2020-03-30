import React, {Component}   from 'react';
import '../assets/styles/coaches.css';
import TeamMember           from './TeamMember';
import {updateClassesVisit} from '../../repository';

class Team extends Component {
  componentDidMount() {
    updateClassesVisit().then();
  }

  render() {
    return (
        <section className = "page-section" id = "about">
          <div className = "container-fluid">
            <div className = "row">
              <div className = "col-lg-12 text-center">
                <h2 id = "test" className = "section-heading text-uppercase">
                  Our trainers
                </h2>
              </div>
            </div>
            <div className = "row">
              <div className = "col-lg-12">
                <ul className = "timeline">

                  { this.props.coaches.map((coach, index) => {
                    return (<TeamMember
                        key = { index }
                        { ...coach }
                    />);
                  }) }

                  <li className = "timeline-inverted">
                    <div className = "timeline-image">
                      <h4>Start
                        <br />Your Journey
                        <br />Now!</h4>
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