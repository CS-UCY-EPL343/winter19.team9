import React from 'react';
import {render} from '@testing-library/react';
import CoachSchedule from '../../components/common/CoachSchedule';

function ByPass(props) {
    return <CoachSchedule {...props} />;
}

describe('<CoachSchedule />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass />);

        expect(container.firstChild).toBeTruthy();
    });
});