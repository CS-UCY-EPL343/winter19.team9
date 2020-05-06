import React      from 'react';
import {render}   from '@testing-library/react';
import CarouselHp from '../../components/common/CarouselHp';

function ByPass(props) {
  return <CarouselHp { ...props } />;
}

describe('<CarouselHp />', () => {
  it('renders correctly', () => {
    const {container} = render(
        <ByPass stylesheetData = { {Home: {carousel: []}} } />);

    expect(container.firstChild).toBeTruthy();
  });
});