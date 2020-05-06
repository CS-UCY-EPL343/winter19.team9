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

  it('check inserted data', () => {
    const {getByTestId} = render(<ByPass testLoading = { true }
                                         title = { 'Test' }
    />);

    expect(getByTestId('title')).toHaveTextContent('Test');
  });
});