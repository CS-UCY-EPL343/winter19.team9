import React from 'react';
import {render} from '@testing-library/react';
import LineChart from '../../components/common/LineChart';

function ByPass(props) {
    return <LineChart {...props} />;
}

describe('<LineChart />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass id = "server-connections"
                                           chartSpeed = "4250"
                                           bgColor = "#1BC98E"
                                           title = "Server"
                                           getData = {100}/>);
        expect(container.firstChild).toHaveClass('col-md-3');

    });

});