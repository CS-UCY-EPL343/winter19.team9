import React       from 'react';
import {render}    from '@testing-library/react';
import ServiceGoal from '../../components/common/ServiceGoal';

function ByPass(props) {
  return <ServiceGoal { ...props } />;
}

describe('<ServiceGoal />', () => {
  it('renders correctly', () => {
    const {container} = render(<ByPass icon = 'envelope' />);
    expect(container.firstChild).toHaveClass('col-xl-3 col-lg-6 col-md-6');
  });

  it('check inserted data', () => {
    const {getByTestId} = render(<ByPass message = { 'Test Message' }
                                         title = { 'Test' }
                                         icon = { 'medal' }
    />);

    expect(getByTestId('title')).toHaveTextContent('Test');
    expect(getByTestId('message')).toHaveTextContent('Test Message');
  });

  describe('check icon', () => {
    it('medal', () => {
      const {getByTestId} = render(<ByPass message = { 'Test Message' }
                                           title = { 'Test' }
                                           icon = { 'medal' }
      />);
      expect(getByTestId('icon')).toHaveAttribute('data-icon', 'medal');
    });

    it('weight', () => {
      const {getByTestId} = render(<ByPass message = { 'Test Message' }
                                           title = { 'Test' }
                                           icon = { 'weight' }
      />);
      expect(getByTestId('icon')).toHaveAttribute('data-icon', 'weight-hanging');
    });

    it('other', () => {
      const {getByTestId} = render(<ByPass message = { 'Test Message' }
                                           title = { 'Test' }
                                           icon = { 'dumbbell' }
      />);
      expect(getByTestId('icon')).toHaveAttribute('data-icon', 'dumbbell');
    });
  });
});