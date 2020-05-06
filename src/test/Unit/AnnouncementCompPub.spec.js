import React               from 'react';
import {render}            from '@testing-library/react';
import AnnouncementCompPub from '../../components/common/AnnouncementCompPub';

function ByPass(props) {
  return <AnnouncementCompPub { ...props } />;
}

describe('<AnnouncementCompPub />', () => {
  it('renders correctly', () => {
    const {container} = render(<ByPass />);

    expect(container.firstChild).toHaveClass('ann-card');
  });

  it('renders for non authorized', () => {
    const Announcement = {
      'title'  : 'Test',
      'message': 'This is a test.',
      'level'  : 0,
    };

    const {queryByTestId} = render(<ByPass title = { Announcement.title }
                                           message = { Announcement.message }
                                           level = { Announcement.level }
    />);

    expect(queryByTestId('title')).toHaveTextContent(Announcement.title);
    expect(queryByTestId('message')).toHaveTextContent(Announcement.message);
    expect(queryByTestId('minus')).toBeFalsy();
  });

  it('renders for users', () => {
    const Announcement = {
      'title'  : 'Test',
      'message': 'This is a test.',
      'level'  : 1,
    };

    const {queryByTestId} = render(<ByPass title = { Announcement.title }
                                           message = { Announcement.message }
                                           level = { Announcement.level }
    />);

    expect(queryByTestId('title')).toHaveTextContent(Announcement.title);
    expect(queryByTestId('message')).toHaveTextContent(Announcement.message);
    expect(queryByTestId('minus')).toBeFalsy();
  });

  it('renders for coaches', () => {
    const Announcement = {
      'title'  : 'Test',
      'message': 'This is a test.',
      'level'  : 2,
    };

    const {queryByTestId} = render(<ByPass title = { Announcement.title }
                                           message = { Announcement.message }
                                           level = { Announcement.level }
    />);

    expect(queryByTestId('title')).toHaveTextContent(Announcement.title);
    expect(queryByTestId('message')).toHaveTextContent(Announcement.message);
    expect(queryByTestId('minus')).toBeTruthy();
  });

  it('renders for admins', () => {
    const Announcement = {
      'title'  : 'Test',
      'message': 'This is a test.',
      'level'  : 3,
    };

    const {queryByTestId} = render(<ByPass title = { Announcement.title }
                                           message = { Announcement.message }
                                           level = { Announcement.level }
    />);

    expect(queryByTestId('title')).toHaveTextContent(Announcement.title);
    expect(queryByTestId('message')).toHaveTextContent(Announcement.message);
    expect(queryByTestId('minus')).toBeTruthy();
  });

});