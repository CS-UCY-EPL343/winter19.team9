import React, {Component} from 'react';
import {Carousel}         from 'react-bootstrap';
import {validURL}         from '../../repository';
// Images

class ControlledCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index    : 0,
      direction: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({index: selectedIndex, direction: e.direction});
  };

  render() {
    return (
        <Carousel activeIndex = { this.state.index }
                  direction = { this.state.direction }
                  onSelect= { (i,e)=>this.handleSelect(i,e) }
                  pauseOnHover = { true }
                  touch = { true }
        >
          { this.props.stylesheetData['Home']['carousel'].map((item, index) => {
            return (
                <Carousel.Item key = { index }>
                  <img
                      className = "d-block img-responsive fit-image"
                      src = { validURL(item.src) ? item.src : process.env.PUBLIC_URL + item.src }
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
}

class CarouselHp extends Component {
  render() {
    return (
        <ControlledCarousel stylesheetData = { this.props.stylesheetData } />
    );
  }
}

export default CarouselHp;