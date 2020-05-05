import React        from 'react';
import {render}     from '@testing-library/react';
import Announcement from '../../components/common/Announcement';
// import '@testing-library/'
// import '@react-testing-library/cleanup-after-each'

function ByPass(props) {
  return <Announcement { ...props } />;
}

describe('<Announcement />', () => {
  it('renders correctly', () => {
    const Announcement = {
      'title'  : 'Test',
      'message': 'This is a test.',
      'isAdder': false,
      'level'  : 0,
    };

    const {container} = render(<ByPass isAdder = { Announcement.isAdder }
                                       title = { Announcement.title }
                                       message = { Announcement.message }
                                       level = { Announcement.level }
    />);

    expect(container.firstChild).toHaveClass('ann-card');
  });

  it('renders for non authorized', () => {
    const Announcement = {
      'title'  : 'Test',
      'message': 'This is a test.',
      'isAdder': false,
      'level'  : 0,
    };

    const {queryByTestId} = render(<ByPass isAdder = { Announcement.isAdder }
                                           title = { Announcement.title }
                                           message = { Announcement.message }
                                           level = { Announcement.level }
    />);

    expect(queryByTestId('title').textContent).toEqual(Announcement.title);
    expect(queryByTestId('message').textContent).toEqual(Announcement.message);
    expect(queryByTestId('minus')).toBeFalsy();
    expect(queryByTestId('plus')).toBeFalsy();
  });

  it('renders for users', () => {
    const Announcement = {
      'title'  : 'Test',
      'message': 'This is a test.',
      'isAdder': false,
      'level'  : 1,
    };

    const {queryByTestId} = render(<ByPass isAdder = { Announcement.isAdder }
                                           title = { Announcement.title }
                                           message = { Announcement.message }
                                           level = { Announcement.level }
    />);

    expect(queryByTestId('title').textContent).toEqual(Announcement.title);
    expect(queryByTestId('message').textContent).toEqual(Announcement.message);
    expect(queryByTestId('minus')).toBeFalsy();
    expect(queryByTestId('plus')).toBeFalsy();
  });

  describe('renders for coaches', () => {
    it('on add', () => {
      const Announcement = {
        'title'  : 'Test',
        'message': 'This is a test.',
        'isAdder': true,
        'level'  : 2,
      };

      const {queryByTestId} = render(<ByPass isAdder = { Announcement.isAdder }
                                             title = { Announcement.title }
                                             message = { Announcement.message }
                                             level = { Announcement.level }
      />);

      expect(queryByTestId('title')).toBeFalsy();
      expect(queryByTestId('message')).toBeFalsy();
      expect(queryByTestId('minus')).toBeFalsy();
      expect(queryByTestId('plus')).toBeTruthy();
    });

    it('on remove', () => {
      const Announcement = {
        'title'  : 'Test',
        'message': 'This is a test.',
        'isAdder': false,
        'level'  : 2,
      };

      const {queryByTestId} = render(<ByPass isAdder = { Announcement.isAdder }
                                             title = { Announcement.title }
                                             message = { Announcement.message }
                                             level = { Announcement.level }
      />);

      expect(queryByTestId('title').textContent).toEqual(Announcement.title);
      expect(queryByTestId('message').textContent)
          .toEqual(Announcement.message);
      expect(queryByTestId('minus')).toBeTruthy();
      expect(queryByTestId('plus')).toBeFalsy();
    });
  });

  describe('renders for admins', () => {
    it('on add', () => {
      const Announcement = {
        'title'  : 'Test',
        'message': 'This is a test.',
        'isAdder': true,
        'level'  : 3,
      };

      const {queryByTestId} = render(<ByPass isAdder = { Announcement.isAdder }
                                             title = { Announcement.title }
                                             message = { Announcement.message }
                                             level = { Announcement.level }
      />);

      expect(queryByTestId('title')).toBeFalsy();
      expect(queryByTestId('message')).toBeFalsy();
      expect(queryByTestId('minus')).toBeFalsy();
      expect(queryByTestId('plus')).toBeTruthy();
    });

    it('on remove', () => {
      const Announcement = {
        'title'  : 'Test',
        'message': 'This is a test.',
        'isAdder': false,
        'level'  : 3,
      };

      const {queryByTestId} = render(<ByPass isAdder = { Announcement.isAdder }
                                             title = { Announcement.title }
                                             message = { Announcement.message }
                                             level = { Announcement.level }
      />);

      expect(queryByTestId('title').textContent).toEqual(Announcement.title);
      expect(queryByTestId('message').textContent)
          .toEqual(Announcement.message);
      expect(queryByTestId('minus')).toBeTruthy();
      expect(queryByTestId('plus')).toBeFalsy();
    });
  });
});