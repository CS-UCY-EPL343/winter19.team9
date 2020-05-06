import React from 'react';
import {render} from '@testing-library/react';
import ServiceGoal from '../../components/common/ServiceGoal';

function ByPass(props) {
    return <ServiceGoal {...props} />;
}

describe('<ServiceGoal />', () => {
    it('renders correctly', () => {
        const ServiceGoal = {};

        const {container} = render(<ByPass icon = 'envelope'/>);
        expect(container.firstChild).toHaveClass('col-xl-3 col-lg-6 col-md-6');

    });

});