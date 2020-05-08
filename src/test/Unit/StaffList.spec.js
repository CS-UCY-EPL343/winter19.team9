import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import StaffList from '../../components/common/StaffList';

function ByPass(props) {
    return <StaffList {...props} />;
}

describe('<StaffList />', () => {
    it('renders correctly', () => {
        const StaffList = {};

        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toBeTruthy();

    });

});
