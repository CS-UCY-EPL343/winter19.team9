import React    from 'react';
import {render} from '@testing-library/react';
import Leader   from '../../components/common/Leader';

function ByPass(props) {
  return <Leader { ...props } />;
}

describe('<Leader />', () => {
  it('renders correctly', () => {
    const {container} = render(<ByPass testLoading = { true } />);
    expect(container.firstChild).toHaveClass('leaderboard__result');

  });

  it('check inserted text', () => {
    const data = {title: 'Test', number: '1234'};
    const {container} = render(<ByPass title = { data.title }
                                       number = { data.number }
    />);

    expect(container.firstChild)
        .toHaveTextContent(data.title + ' - ' + data.number);
  });
});