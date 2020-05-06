import React, {Component}         from 'react';
import '../assets/styles/homePage.css';
import * as Icons                 from '@fortawesome/fontawesome-free-solid';
import {FontAwesomeIcon}          from '@fortawesome/react-fontawesome';
import {faMedal, faWeightHanging} from '@fortawesome/free-solid-svg-icons';

class ServiceGoal extends Component {
  render() {
    return (
        <div className = { 'col-xl-3 col-lg-6 col-md-6' }>
          <div className = { 'service-box' }>
            <div className = { 'service-box-icon' }>
              {/*<FontAwesome*/ }
              {/*    name={this.props.icon}*/ }
              {/*    size="2x"*/ }
              {/*/>*/ }
              {
                this.props.icon === 'medal' ?
                    <FontAwesomeIcon data-testid = { 'icon' }
                                     icon = { faMedal }
                                     size = "2x"
                    />
                    :
                    this.props.icon === 'weight' ?
                        <FontAwesomeIcon data-testid = { 'icon' }
                                         icon = { faWeightHanging }
                                         size = "2x"
                        />
                        :
                        <FontAwesomeIcon data-testid = { 'icon' }
                                         icon = { Icons['fa'
                                                        + this.props.icon.charAt(
                                             0).toUpperCase()
                                                        + this.props.icon.slice(
                                             1)] }
                                         size = "2x"
                        />
              }
            </div>
            <div className = { 'service-box-content' }>
              <h1 data-testid = { 'title' }
                  className = { 'service-box-title' }
              >{ this.props.title }</h1>
              <p data-testid = { 'message' }>{ this.props.message }</p>
            </div>
          </div>
        </div>
    );
  }
}

export default ServiceGoal;