import React from 'react';
import {render} from '@testing-library/react';
import ControlledCarousel from '../../components/common/ControlledCarousel';

function ByPass(props) {
    return <ControlledCarousel {...props} />;
}

describe('<ControlledCarousel />', () => {
    it('renders correctly', () => {
        const ControlledCarousel = {};

        const {container} = render(<ByPass

        />);

    });

});