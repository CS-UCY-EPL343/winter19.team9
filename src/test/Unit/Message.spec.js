import React    from 'react';
import {render} from '@testing-library/react';
import Message  from '../../components/common/Message';

function ByPass(props) {
  return <Message { ...props } />;
}

describe('<Message />', () => {
  const data = {
    title      : 'Testing',
    message    : 'Testing Message',
    toContact  : 'John - Coach',
    fromContact: 'Mary - User',
    timestamp  : '2020-05-06 00:10:52',
  };

  it('renders correctly', () => {
    const {container} = render(<ByPass testLoading = { true } />);
    expect(container.firstChild).toHaveClass('msg-card');
  });

  it('check inserted data', () => {
    const {getByTestId} = render(<ByPass hasSeen = { 1 }
                                         outgoing = { true } { ...data } />);

    expect(getByTestId('title')).toHaveTextContent(data.title);
    expect(getByTestId('message')).toHaveTextContent(data.message);
    expect(getByTestId('toContact')).toHaveTextContent(data.toContact);
    expect(getByTestId('fromContact')).toHaveTextContent(data.fromContact);
    expect(getByTestId('timestamp')).toHaveTextContent(data.timestamp);
  });

  describe('outgoing message', () => {
    it('without image', () => {
      const {getByTestId, container} = render(
          <ByPass hasSeen = { 1 } outgoing = { true } { ...data } />);

      expect(container.firstChild).toHaveClass('left');
      expect(getByTestId('image'))
          .toHaveAttribute('src',
              'https://www.w3schools.com/howto/img_avatar.png');
    });

    it('with image', () => {
      const {getByTestId, container} = render(
          <ByPass hasSeen = { 1 } outgoing = { true } { ...data } />);

      expect(container.firstChild).toHaveClass('left');
      expect(getByTestId('image'))
          .toHaveAttribute('src',
              'https://www.w3schools.com/howto/img_avatar.png');
    });
  });

  describe('ingoing message', () => {
    it('image', () => {
      const {getByTestId, container} = render(
          <ByPass hasSeen = { 1 } outgoing = { false } { ...data } />);

      expect(container.firstChild).toHaveClass('right');
      expect(getByTestId('image'))
          .toHaveAttribute('src', 'fitnessFactoryLogo.png');
    });
  });

  describe('is seen', () => {
    it('seen', () => {
      const {container} = render(
          <ByPass hasSeen = { 0 } outgoing = { false } { ...data } />);

      expect(container.firstChild).toHaveClass('new-msg');
    });

    it('not seen', () => {
      const {container} = render(
          <ByPass hasSeen = { 1 } outgoing = { false } { ...data } />);

      expect(container.firstChild).not.toHaveClass('new-msg');
    });
  });
});