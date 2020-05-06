import React        from 'react';
import {render}     from '@testing-library/react';
import BookClass from '../../components/common/BookClass';

function ByPass(props) {
  return <BookClass { ...props } />;
}

describe('<BookClass />', () => {
  it('renders correctly', () => {
    const {container} = render(<ByPass />);

    expect(container.firstChild).toBeTruthy();
  });
});