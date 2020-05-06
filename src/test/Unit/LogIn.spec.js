import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import LogIn from '../../components/common/LogIn';

function ByPass(props) {
    return <LogIn {...props} />;
}

describe('<LogIn />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass testLoading={true}/>);
        expect(container.firstChild).toBeTruthy();

    });

    it('Submit-Button', () => {
        const testSubmit = jest.fn();

        const {queryByTestId} = render(
            <ByPass testLoading={true} testSubmit={testSubmit}
            />);
        fireEvent.click(queryByTestId('button'));
        expect(testSubmit).toHaveBeenCalled();
    });

});


describe('input values', () => {
    const data = {
        'username'        : 'testing1234',
        'password'        : 'McTesting2',
    };
    it('Check User Credentials', () => {
        const {queryByPlaceholderText} = render(
            <ByPass testLoading = { true } />);

        const username = queryByPlaceholderText('Username');
        const password = queryByPlaceholderText('Password');


        expect(username).toBeEmpty();
        expect(password).toBeEmpty();
    });

    it('Change Input Data', () => {
        const {queryByPlaceholderText} = render(
            <ByPass testLoading = { true } />);
        const username = queryByPlaceholderText('Username');
        const password = queryByPlaceholderText('Password');

        fireEvent.change(username, {target: {value: data.username}});
        fireEvent.change(password, {target: {value: data.password}});

        expect(username).toHaveValue(data.username);
        expect(password).toHaveValue(data.password);

    });


});