import React from 'react';
import {render} from '@testing-library/react';
import Graphs from '../../components/common/Graphs';

function ByPass(props) {
    return <Graphs {...props} />;
}

describe('<Graphs />', () => {
    it('renders correctly', () => {
        const Graphs = {};

        const {container} = render(<ByPass

        />);

    });

});