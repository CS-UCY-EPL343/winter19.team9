import React from 'react';
import {render} from '@testing-library/react';
import Event from '../../components/common/Event';

function ByPass(props) {
  return <Event { ...props } />;
}

describe('<Event />', () => {
  it('renders correctly', () => {
    const {container} = render(
        <ByPass
            active = { true }
            timeStart = { '17:00' }
            event = { 'Test' }
        />);
    expect(container.firstChild).toHaveClass('event_item');
  });

  describe('Activity & Time', () => {
    it('active & am', () => {
      const {container} = render(
          <ByPass
              active = { true }
              timeStart = { '07:00' }
              event = { 'Test' }
          />);
      expect(container.firstChild).toHaveClass('event_item');
      expect(container.firstChild.childNodes[0]).toHaveClass('dot_active');
      expect(container.firstChild.childNodes[1]).toHaveTextContent('am');

    });

    it('active & pm', () => {
      const {container} = render(
          <ByPass
              active = { true }
              timeStart = { '17:00' }
              event = { 'Test' }
          />);
      expect(container.firstChild).toHaveClass('event_item');
      expect(container.firstChild.childNodes[0]).toHaveClass('dot_active');
      expect(container.firstChild.childNodes[1]).toHaveTextContent('pm');

    });

    it('not active & am', () => {
      const {container} = render(
          <ByPass
              active = { false }
              timeStart = { '07:00' }
              event = { 'Test' }
          />);
      expect(container.firstChild).toHaveClass('event_item');
      expect(container.firstChild.childNodes[0]).not.toHaveClass('dot_active');
      expect(container.firstChild.childNodes[1]).toHaveTextContent('am');

    });

    it('not active & pm', () => {
      const {container} = render(
          <ByPass
              active = { false }
              timeStart = { '17:00' }
              event = { 'Test' }
          />);
      expect(container.firstChild).toHaveClass('event_item');
      expect(container.firstChild.childNodes[0]).not.toHaveClass('dot_active');
      expect(container.firstChild.childNodes[1]).toHaveTextContent('pm');

    });
  });
  describe('Check content', () => {
    it('content passed correctly', () => {
      const {container} = render(
          <ByPass
              active = { false }
              timeStart = { '17:00' }
              event = { 'Test' }
          />);
      expect(container.firstChild).toHaveClass('event_item');
      expect(container.firstChild.childNodes[0]).not.toHaveClass('dot_active');
      expect(container.firstChild.childNodes[1]).toHaveTextContent('pm');
      expect(container.firstChild.childNodes[2]).toHaveTextContent('Test');
    });
  });
});