import React        from 'react';
import {render, fireEvent}     from '@testing-library/react';
import BookClass from '../../components/common/BookClass';

function ByPass(props) {
  return <BookClass { ...props } />;
}

describe('<BookClass />', () => {
  it('renders correctly', () => {
    const Announcement = {
      'title'  : 'Test',
      'message': 'This is a test.',
      'isAdder': false,
      'level'  : 0,
    };

    const {container} = render(<ByPass />);

    expect(container.firstChild).toHaveClass('col-lg-4 col-md-12 col-sm-12');
  });

  describe('select class to enroll', () => {

  });
});