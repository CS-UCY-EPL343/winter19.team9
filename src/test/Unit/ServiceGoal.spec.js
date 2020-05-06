import React from 'react';
import {render} from '@testing-library/react';
import ServiceGoal from '../../components/common/ServiceGoal';

function ByPass(props) {
    return <ServiceGoal {...props} />;
}

describe('<ServiceGoal />', () => {
    it('renders correctly', () => {
        const ServiceGoal = {};

        const {container} = render(<ByPass

        />);

    });

});