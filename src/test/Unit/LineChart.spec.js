import React from 'react';
import {render} from '@testing-library/react';
import LineChart from '../../components/common/LineChart';

function ByPass(props) {
    return <LineChart {...props} />;
}

describe('<LineChart />', () => {
    it('renders correctly', () => {
        const LineChart = {};

        const {container} = render(<ByPass

        />);

    });

});