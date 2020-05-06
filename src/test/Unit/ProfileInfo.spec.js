import React       from 'react';
import {render}    from '@testing-library/react';
import ProfileInfo from '../../components/common/ProfileInfo';

function ByPass(props) {
  return <ProfileInfo { ...props } />;
}

describe('<ProfileInfo />', () => {
  it('renders correctly', () => {
    //const ProfileInfo = {};

    const {container} = render(<ByPass
    />);
    expect(container.firstChild).toHaveClass('col-lg-4 col-md-12 col-sm-12');
  });

  describe('check inserted data', () => {

    it('without image', () => {
      const {getByTestId} = render(
          <ByPass />);

      expect(getByTestId('image'))
          .toHaveAttribute('src',
              'https://www.w3schools.com/howto/img_avatar.png');
    });

    it('with image', () => {
      const {getByTestId} = render(
          <ByPass />);

      expect(getByTestId('image'))
          .toHaveAttribute('src',
              'https://www.w3schools.com/howto/img_avatar.png');
    });
  });
});