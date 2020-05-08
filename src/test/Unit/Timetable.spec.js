import React from 'react';
import {render} from '@testing-library/react';
import Timetable from '../../components/common/Timetable';

function ByPass(props) {
    return <Timetable {...props} />;
}

describe('<Timetable />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass />);

        expect(container.firstChild).toBeTruthy();
    });
});