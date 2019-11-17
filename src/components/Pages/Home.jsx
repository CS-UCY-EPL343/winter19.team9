import React, { Component } from 'react';
// Re-usable components
import CarouselHp           from '../Common/CarouselHP';
import Services             from '../Common/Services';
// Images
import logo_img             from '../../logo.svg';

class Home extends Component {
    render() {
        return (
            <div>
                <CarouselHp />

                <div id = "author">
                    <img src = { logo_img } alt = { 'author' } />
                </div>

                <Services />
            </div>
        )
    }
}

export default Home;