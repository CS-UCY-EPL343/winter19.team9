import React    from 'react';
import {render} from '@testing-library/react';
import PieChart from '../../components/common/PieChart';

function ByPass(props) {
  return <PieChart { ...props } />;
}

describe('<PieChart />', () => {
  it('renders correctly', () => {
    const {container} = render(<ByPass testLoading = { true } />);

    expect(container.firstChild).toBeTruthy();
  });
});