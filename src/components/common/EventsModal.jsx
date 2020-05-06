import React, {Component} from 'react';
import '../assets/styles/EventsModal.css';
import Event              from './Event';
import {getEvents}        from '../../repository';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';
import Spinner            from '../Spinner';

class EventsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events : [],
      date   : '',
      loading: true,
    };
  }

  componentDidMount() {
    const options = {
      weekday: 'long',
      year   : 'numeric',
      month  : 'long',
      day    : 'numeric',
    };
    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    this.setState({date: dateTimeFormat.format(new Date())});

    getEvents().then(response => {
      this.setState({events: response.events});
    }).then(() => {
      this.setState({loading: false});
    }).catch();
  }

  render() {
    return (
        <div id = { 'EventsModal' } className={ 'eventClass'}>
          { this.state.loading ?
              <Spinner style = { {
                'height'         : '250px',
                'backgroundColor': 'transparent',
              } }
              />
              :
              <AnimatedOnScroll animationIn = "slideInDown">
                <div className = "container">
                  <div className = "calendar dark">
                    <div className = "calendar_header">
                      <h1 className = "header_title">Welcome Back</h1>
                      <p className = "header_copy"> Calendar Plan</p>
                    </div>
                    <div className = "calendar_plan">
                      <div className = "cl_plan">
                        <div className = "cl_title">Today</div>
                        <div className = "cl_copy">{ this.state.date }</div>
                        {/*<div class = "cl_add">*/ }
                        {/*  <i class = "fas fa-plus"/>*/ }
                        {/*</div>*/ }
                      </div>
                    </div>
                    <div className = "calendar_events">
                      <p className = "ce_title">Upcoming Events</p>
                      { this.state.events.length === 0 ?
                          <div style = { {'textAlign': 'center'} }>
                            You have no training planned today.<br />
                            Take the day off, you deserve it!
                          </div>
                          :
                          this.state.events.map((event, index) => {
                            const startSplit = event.timeStart.split(':');
                            const start = parseInt(startSplit[0]) * 60
                                          + parseInt(startSplit[1]);
                            const now = new Date().getHours() * 60
                                        + new Date().getMinutes();
                            const end = start + 60;
                            let active = false;
                            if (start <= now && now <= end) {
                              active = true;
                            }
                            return <Event key = { index } { ...event }
                                          active = { active }
                            />;
                          })
                      }
                    </div>
                  </div>
                </div>
              </AnimatedOnScroll>
          }
        </div>
    );
  }
}

export default EventsModal;