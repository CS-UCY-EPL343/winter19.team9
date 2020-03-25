import React, {Component}   from 'react';
import '../assets/styles/classes.css';
import {AnimatedOnScroll}   from 'react-animated-css-onscroll';
import {updateClassesVisit} from '../../repository';

class Classes extends Component {

  componentDidMount() {
    updateClassesVisit().then();
  }

  render() {
    return (
        <section className = "classes-section" id = "classes">
          <div className = "container">
            <div className = "page-title">
              <h1>Our Classes</h1>
            </div>
            <div className = "row">
              { this.props.stylesheetData['Class']['classes'].map((c, i) => {
                return (
                    <div key = { i } className = "col-md-4 col-sm-6">
                      <div className = "single-classes">
                        <div className = "classes-img">
                          <img src = { process.env.PUBLIC_URL + c.src }
                               className = "rounded-corners"
                               alt = ""
                          />
                        </div>
                        <div className = "classes-text">
                          <h5>{ c.title }</h5>
                          <p>{ c.text }</p>
                        </div>
                      </div>
                    </div>
                );
              }) }
            </div>
          </div>
          <AnimatedOnScroll animationIn = "zoomInUp">
            <div className = 'container'>
              <div className = 'full-width-image'>
                <img src = { process.env.PUBLIC_URL
                             + this.props.stylesheetData['Class']['timetable'].src }
                     alt = "timetable"
                />
              </div>
            </div>
          </AnimatedOnScroll>
        </section>
    );
  }
}

export default Classes;