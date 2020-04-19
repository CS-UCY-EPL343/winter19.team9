import React, {Component} from 'react';
import '../assets/styles/EventsModal.css';
// import Event              from './Event';
// import {
//   getEvents,
// }                         from '../../repository';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';
import Spinner            from '../Spinner';

class MessagesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events : [],
      loading: false, //TODO true
    };
  }

  // componentDidMount() {
  //   getEvents().then(response => {
  //     this.setState({
  //       events: response.events[0].sort(
  //           function(a, b) {
  //             // noinspection JSUnresolvedVariable
  //             return b.Event_ID
  //                    - a.Event_ID;
  //           }),
  //     });
  //   }).then(() => {
  //     this.setState({loading: false});
  //   }).catch(err => alert(err));
  // }

  render() {
    return (
        <div id = { 'EventsModal' }>
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
                        <div className = "cl_copy">22nd April 2018</div>
                        {/*<div class = "cl_add">*/}
                        {/*  <i class = "fas fa-plus"/>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                    <div className = "calendar_events">
                      <p className = "ce_title">Upcoming Events</p>
                      <div className = "event_item">
                        <div className = "ei_Dot dot_active" />
                        <div className = "ei_Title">10:30 am</div>
                        <div className = "ei_Copy">Monday briefing with the team
                        </div>
                      </div>
                      <div className = "event_item">
                        <div className = "ei_Dot" />
                        <div className = "ei_Title">12:00 pm</div>
                        <div className = "ei_Copy">Lunch for with the besties
                        </div>
                      </div>
                      <div className = "event_item">
                        <div className = "ei_Dot" />
                        <div className = "ei_Title">13:00 pm</div>
                        <div className = "ei_Copy">Meet with the client for
                                                   final
                                                   design <br /> @foofinder
                        </div>
                      </div>
                      <div className = "event_item">
                        <div className = "ei_Dot" />
                        <div className = "ei_Title">14:30 am</div>
                        <div className = "ei_Copy">Plan event night to inspire
                                                   students
                        </div>
                      </div>
                      <div className = "event_item">
                        <div className = "ei_Dot"/>
                        <div className = "ei_Title">15:30 am</div>
                        <div className = "ei_Copy">Add some more events to the
                                                   calendar
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedOnScroll>
          }
        </div>
    );
  }
}

export default MessagesModal;