import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import ResetPassword from "../../components/pages/ResetPassword";

function ByPass(props) {
    return <ResetPassword {...props} />;
}

describe('<ResetPassword />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toBeTruthy();

    });

    describe('input values', () => {
        const data = {
            'username'        : 'testing1234',
            'password'        : 'McTesting2',
            'confirm_password': 'McTesting2',
        };
        it('check user data', () => {
            const {queryByPlaceholderText} = render(
                <ByPass testLoading = { true } />);

            const username = queryByPlaceholderText('Username');
            const password = queryByPlaceholderText('New Password');
            const confirm_password = queryByPlaceholderText('Confirm Password');

            expect(username).toBeEmpty();
            expect(password).toBeEmpty();
            expect(confirm_password).toBeEmpty();
        });
        it('change input data', () => {
            const {queryByPlaceholderText} = render(
                <ByPass testLoading = { true } />);


            const username = queryByPlaceholderText('Username');
            const password = queryByPlaceholderText('New Password');
            const confirm_password = queryByPlaceholderText('Confirm Password');


            fireEvent.change(username, {target: {value: data.username}});
            fireEvent.change(password, {target: {value: data.password}});
            fireEvent.change(confirm_password,
                {target: {value: data.confirm_password}});


            expect(username).toHaveValue(data.username);
            expect(password).toHaveValue(data.password);
            expect(confirm_password).toHaveValue(data.confirm_password);
        });


    });
});