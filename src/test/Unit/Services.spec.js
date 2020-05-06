import React from 'react';
import {render} from '@testing-library/react';
import Services from '../../components/common/Services';

function ByPass(props) {
    return <Services {...props} />;
}

describe('<Services />', () => {
    it('renders correctly', () => {
        const Services = {};

        const {container} = render(<ByPass

        />);

    });

});