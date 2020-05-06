import React     from 'react';
import {render}  from '@testing-library/react';
import ContactUs from '../../components/common/ContactUs';

function ByPass(props) {
  return <ContactUs { ...props } />;
}

describe('<ContactUs />', () => {
  it('renders correctly', () => {
    const {container} = render(<ByPass contact = { {
      'address': 'test',
      'phone'  : '1-800-test',
      'email'  : 'test@testing.com',
    } }
    />);

    expect(container.firstChild).toBeTruthy();
  });
});