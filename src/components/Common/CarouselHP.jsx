import React, { Component, useState } from 'react';
import { Carousel }                   from 'react-bootstrap';
// Images
import img1                           from '../assets/img/facilities/MK7_2008.jpg';
import img2                           from '../assets/img/facilities/MK7_2011.jpg';
import img3                           from '../assets/img/facilities/MK7_2019.jpg';
import img4                           from '../assets/img/facilities/MK7_2044.jpg';

// Carousel Items
const carousel = [
    {
        src  : img1,
        label: 'First slide label',
        text : 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
        src  : img2,
        label: 'First slide label',
        text : 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
        src  : img3,
        label: 'First slide label',
        text : 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
        src  : img4,
        label: 'First slide label',
        text : 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }
];

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    return (
        <Carousel activeIndex = { index }
                  direction = { direction }
                  onSelect = { handleSelect }
                  pauseOnHover = { true }
                  touch = { true }
        >
            { carousel.map((item, index) => {
                return (
                    <Carousel.Item key = { index }>
                        <img
                            className = "d-block img-responsive fit-image"
                            src = { item.src }
                            alt = { item.label }
                        />
                        <Carousel.Caption>
                            <h3>{ item.label }</h3>
                            <p>{ item.text }</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            }) }
        </Carousel>
    );
}

class CarouselHp extends Component {
    render() {
        return (
            <ControlledCarousel />
        );
    }
}

export default CarouselHp;