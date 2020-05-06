import React from 'react';
import {render} from '@testing-library/react';
import SignUp from '../../components/common/SignUp';

function ByPass(props) {
    return <SignUp {...props} />;
}

describe('<SignUp />', () => {
    it('renders correctly', () => {
        const SignUp = {};

        const {container} = render(<ByPass

        />);

    });

});