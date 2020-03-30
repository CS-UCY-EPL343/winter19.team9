import React, {Component} from 'react';
import '../assets/styles/homePage.css';
import ServiceGoal        from './ServiceGoal';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';
import bgImage            from '../assets/img/logos/ffLogoTransparent.png';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };
  }

  componentDidMount() {
    this.setState({services: this.props.stylesheetData['Home']['services']});
  }

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
          { this.state.services.length === 6 &&
            <div className = { 'service-area' }>
              <div className = { 'container' }>
                <div className = { 'row' }>
                  <AnimatedOnScroll animationInDelay = { 500 }
                                    animationIn = "zoomInRight"
                                    style = { {
                                      position : 'absolute',
                                      height   : 650,
                                      width    : 650,
                                      top      : '50%',
                                      left     : '50%',
                                      transform: 'translate(-50%, -50%)',
                                    } }
                  >
                    <img className = { 'bgImage' }
                         src = { bgImage }
                         alt = { 'Background' }
                    />
                  </AnimatedOnScroll>

                  <AnimatedOnScroll animationIn = "fadeInLeft">
                    <div className = { 'col-lg-12' }>
                      <div className = { 'row d-flex justify-content-between' }>
                        <ServiceGoal
                            icon = { this.state.services[0].icon }
                            title = { this.state.services[0].title }
                            message = { this.state.services[0].message }
                        />

                        <ServiceGoal
                            icon = { this.state.services[1].icon }
                            title = { this.state.services[1].title }
                            message = { this.state.services[1].message }
                        />
                      </div>
                    </div>
                  </AnimatedOnScroll>

                  <AnimatedOnScroll animationIn = "fadeInRight">
                    <div className = { 'col-lg-12' }>
                      <div className = { 'row d-flex justify-content-between' }>
                        <ServiceGoal
                            icon = { this.state.services[2].icon }
                            title = { this.state.services[2].title }
                            message = { this.state.services[2].message }
                        />

                        <ServiceGoal
                            icon = { this.state.services[3].icon }
                            title = { this.state.services[3].title }
                            message = { this.state.services[3].message }
                        />
                      </div>
                    </div>
                  </AnimatedOnScroll>

                  <AnimatedOnScroll animationIn = "fadeInLeft">
                    <div className = { 'col-lg-12' }>
                      <div className = { 'row d-flex justify-content-between' }>
                        <ServiceGoal
                            icon = { this.state.services[4].icon }
                            title = { this.state.services[4].title }
                            message = { this.state.services[4].message }
                        />

                        <ServiceGoal
                            icon = { this.state.services[5].icon }
                            title = { this.state.services[5].title }
                            message = { this.state.services[5].message }
                        />
                      </div>
                    </div>
                  </AnimatedOnScroll>
                </div>
              </div>
            </div>
          }
        </div>

    );
  }
}

export default Services;