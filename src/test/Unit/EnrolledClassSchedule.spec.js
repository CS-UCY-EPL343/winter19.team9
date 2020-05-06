import React from 'react';
import {render} from '@testing-library/react';
import EnrolledClassSchedule from '../../components/common/EnrolledClassSchedule';

function ByPass(props) {
    return <EnrolledClassSchedule {...props} />;
}

describe('<EnrolledClassSchedule />', () => {
    it('renders correctly', () => {
        const EnrolledClassSchedule = {};

        const {container} = render(<ByPass

        />);

    });

});