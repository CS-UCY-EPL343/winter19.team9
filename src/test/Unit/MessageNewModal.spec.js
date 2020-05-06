import React from 'react';
import {render} from '@testing-library/react';
import MessagesNewModalForm from '../../components/common/MessagesNewModalForm';

function ByPass(props) {
    return <MessagesNewModalForm {...props} />;
}

describe('<MessagesNewModalForm />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass recipients={[]} toggle={jest.fn()}/>);
        expect(container.firstChild).toBeTruthy();

    });

});