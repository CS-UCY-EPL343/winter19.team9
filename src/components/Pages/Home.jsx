import React, { Component } from 'react';
// Re-usable components
import CarouselHp           from '../Common/CarouselHP';
// Images
import logo_img             from '../../logo.svg';

class Home extends Component {
    render() {
        return (
            <div>
                <CarouselHp />

                <div id = "author">
                    <img src = { logo_img }  alt={'author'}/>
                </div>
            </div>
        )
    }
}

export default Home;