import React from 'react';
import {render} from '@testing-library/react';
import ResetPassword from "../../components/pages/ResetPassword";

function ByPass(props) {
    return <ResetPassword {...props} />;
}

describe('<ResetPassword />', () => {
    it('renders correctly', () => {
        const StaffList = {};

        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toBeTruthy();

    });

});