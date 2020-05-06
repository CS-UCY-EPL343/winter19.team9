import React from 'react';
import {render} from '@testing-library/react';
import GeneralScheduleModalBody from '../../components/common/GeneralScheduleModalBody';

function ByPass(props) {
    return <GeneralScheduleModalBody {...props} />;
}

describe('<GeneralScheduleModalBody />', () => {
    it('renders correctly', () => {
        const GeneralScheduleModalBody = {};

        const {container} = render(<ByPass

        />);

    });

});