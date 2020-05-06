import React from 'react';
import {render} from '@testing-library/react';
import PrivacyPolicy from "../../components/pages/PrivacyPolicy";

function ByPass(props) {
    return <PrivacyPolicy {...props} />;
}

describe('<PrivacyPolicy />', () => {
    it('renders correctly', () => {
        const StaffList = {};

        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toBeTruthy();

    });

});