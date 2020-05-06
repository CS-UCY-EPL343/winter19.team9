import React from 'react';
import {render} from '@testing-library/react';
import Navigation from '../../components/common/Navigation';

function ByPass(props) {
    return <Navigation {...props} />;
}

describe('<Navigation />', () => {
    it('renders correctly', () => {
        const Navigation = {};

        const {container} = render(<ByPass

        />);

    });

});