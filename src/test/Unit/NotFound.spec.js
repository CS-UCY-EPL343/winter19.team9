import React from 'react';
import {render} from '@testing-library/react';
import NotFound from '../../components/common/NotFound';

function ByPass(props) {
    return <NotFound {...props} />;
}

describe('<NotFound />', () => {
    it('renders correctly', () => {
        const NotFound = {};

        const {container} = render(<ByPass

        />);

    });

});