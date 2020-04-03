import React, {Component}                   from 'react';
// Re-usable components
import CarouselHp                           from '../common/CarouselHP';
import Services                             from '../common/Services';
import logo_img
                                            from '../assets/img/logos/fitnessFactoryLogo.png';
import AnnouncementsPublic
                                            from '../common/AnnouncementsPublic';
import {loggedInVisit, updateHomePageVisit} from '../../repository';
import PrivacyPolicy from "./PrivacyPolicy";

class Home extends Component {
  componentDidMount() {
    loggedInVisit().then();
    updateHomePageVisit().then();
  }

  render() {
    return (
        <div>
          <CarouselHp stylesheetData = { this.props.stylesheetData } />

          <div id = "author">
            <img src = { logo_img } alt = { 'author' } />
          </div>

          <Services stylesheetData = { this.props.stylesheetData } />

          <AnnouncementsPublic userLevel = { this.props.userLevel } />
        </div>
    );
  }
}

export default Home;