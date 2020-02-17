import React, {Component}  from 'react';
// Re-usable components
import CarouselHp          from '../common/CarouselHP';
import Services            from '../common/Services';
import logo_img            from '../assets/img/logos/fitnessFactoryLogo.png';
import AnnouncementsPublic from '../common/AnnouncementsPublic';

class Home extends Component {
    render() {
        return (
            <div>
                <CarouselHp/>

                <div id="author">
                    <img src={logo_img} alt={'author'}/>
                </div>

                <Services/>

                <AnnouncementsPublic userLevel={this.props.userLevel} />
            </div>
        )
    }
}

export default Home;