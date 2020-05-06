import React from 'react';
import {render} from '@testing-library/react';
import Event from '../../components/common/Event';

function ByPass(props) {
  return <Event { ...props } />;
}

describe('<Event />', () => {
  it('renders correctly', () => {
    const {container} = render(
        <ByPass active = { true }
                timeStart = { '17:00' }
                event = { 'Test' }
        />);

    expect(container.firstChild).toBeTruthy();
  });
});