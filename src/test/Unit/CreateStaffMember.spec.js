import React from 'react';
import {render} from '@testing-library/react';
import CreateStaffMember from '../../components/common/CreateStaffMember';

function ByPass(props) {
    return <CreateStaffMember {...props} />;
}

describe('<CreateStaffMember />', () => {
    it('renders correctly', () => {
        const {container} = render(
            <ByPass />);

        expect(container.firstChild).toBeTruthy();
    });
});