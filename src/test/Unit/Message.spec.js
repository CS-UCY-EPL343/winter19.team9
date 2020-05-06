import React from 'react';
import {render} from '@testing-library/react';
import Message from '../../components/common/Message';

function ByPass(props) {
    return <Message {...props} />;
}

describe('<Message />', () => {
    it('renders correctly', () => {
        const Message = {};

        const {container} = render(<ByPass

        />);

    });

});