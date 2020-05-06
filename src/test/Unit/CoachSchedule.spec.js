import React from 'react';
import {render} from '@testing-library/react';
import CoachSchedule from '../../components/common/CoachSchedule';

function ByPass(props) {
    return <CoachSchedule {...props} />;
}

describe('<CoachSchedule />', () => {
    it('renders correctly', () => {
        const CoachSchedule = {};

        const {container} = render(<ByPass

        />);

    });

});