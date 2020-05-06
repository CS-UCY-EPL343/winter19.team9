import React from 'react';
import {render} from '@testing-library/react';
import SignInUpModal from '../../components/common/SignInUpModal';

function ByPass(props) {
    return <SignInUpModal {...props} />;
}

describe('<SignInUpModal />', () => {
    it('renders correctly', () => {
        const SignInUpModal = {};

        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toBeTruthy();
    });

});