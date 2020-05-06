import React from 'react';
import {render} from '@testing-library/react';
import MessageNewModal from '../../components/common/MessageNewModal';

function ByPass(props) {
    return <MessageNewModal {...props} />;
}

describe('<MessageNewModal />', () => {
    it('renders correctly', () => {
        const MessageNewModal = {};

        const {container} = render(<ByPass

        />);

    });

});