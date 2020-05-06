import React from 'react';
import {render} from '@testing-library/react';
import ContactUs from '../../components/common/ContactUs';

function ByPass(props) {
    return <ContactUs {...props} />;
}

describe('<ContactUs />', () => {
    it('renders correctly', () => {
        const ContactUs = {};

        const {container} = render(<ByPass

        />);

    });

});