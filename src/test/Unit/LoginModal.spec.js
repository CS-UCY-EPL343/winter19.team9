import React from 'react';
import {render} from '@testing-library/react';
import LoginModal from '../../components/common/LoginModal';

function ByPass(props) {
    return <LoginModal {...props} />;
}

describe('<LoginModal />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass testLoading={true}/>);
        expect(container.firstChild).toBeTruthy();
    });

    // it('check input data', () => {
    //     const {queryByPlaceholderText} = render(<ByPass testLoading={true}/>);
    //     const username = queryByPlaceholderText('Username');
    //     const password = queryByPlaceholderText('Enter Password');
    //     const name     = queryByPlaceholderText('First Name');
    //     const surname  = queryByPlaceholderText('Last Name');
    // });
});