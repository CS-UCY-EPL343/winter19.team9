import React    from 'react';
import {render} from '@testing-library/react';
import Footer   from '../../components/common/Footer';

function ByPass(props) {
  return <Footer { ...props } />;
}

describe('<Footer />', () => {
  const data = {
    social      : {
      text     : 'Testing',
      facebook : 'Facebook',
      instagram: 'Instagram',
    },
    'about-us'  : {address: 'Testing Address', email: 'test@testing.com'},
    'about-club': ['Test1', 'Test2', 'Test3'],
  };

  it('renders correctly', () => {
    const {container} = render(<ByPass testLoading = { true }
                                       stylesheetData = { data }
    />);
    expect(container.firstChild).toBeTruthy();
  });

  it('check inserted text', () => {
    const {getByTestId, getAllByTestId} = render(<ByPass testLoading = { true }
                                                         stylesheetData = { data }
    />);

    expect(getByTestId('text')).toHaveTextContent(data.social.text);
    expect(getByTestId('facebook')).toHaveAttribute('href', data.social.facebook);
    expect(getByTestId('instagram')).toHaveAttribute('href', data.social.instagram);
    expect(getByTestId('address')).toHaveTextContent(data['about-us'].address);
    expect(getByTestId('email')).toHaveTextContent(data['about-us'].email);
    expect(getAllByTestId('about-club').length).toEqual(data['about-club'].length);

    const divs = getAllByTestId('about-club');
    for (let i = 0; i < divs.length; i++) {
      expect(divs[i].textContent).toEqual(data['about-club'][i]);
    }
  });
});