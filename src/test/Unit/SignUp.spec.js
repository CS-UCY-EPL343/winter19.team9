import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import SignUp from '../../components/common/SignUp';

function ByPass(props) {
    return <SignUp {...props} />;
}

describe('<SignUp />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toBeTruthy();
    });

    describe('input values', () => {
        const data = {
            'name'            : 'Test',
            'surname'         : 'Mc Testing the 2nd',
            'email'           : 'mc@testing.com',
            'bdate'           : '09-09-1990',
            'username'        : 'testing1234',
            'password'        : 'McTesting2',
            'confirm_password': 'McTesting2'
        };

        it('check user data', () => {
            const {queryByPlaceholderText} = render(
                <ByPass testLoading = { true } />);

            const name = queryByPlaceholderText('First Name');
            const surname = queryByPlaceholderText('Last Name');
            const email = queryByPlaceholderText('Email Address');
            const username = queryByPlaceholderText('Username');
            const password = queryByPlaceholderText('Password');
            const confirm_password = queryByPlaceholderText('Confirm Password');
            const birthday = queryByPlaceholderText('Birthday');

            expect(name).toBeEmpty();
            expect(surname).toBeEmpty();
            expect(email).toBeEmpty();
            expect(username).toBeEmpty();
            expect(password).toBeEmpty();
            expect(confirm_password).toBeEmpty();
            expect(birthday).toBeEmpty();
        });

        // noinspection DuplicatedCode
        it('change input data', () => {
            const {queryByPlaceholderText} = render(
                <ByPass testLoading = { true } />);

            const name = queryByPlaceholderText('First Name');
            const surname = queryByPlaceholderText('Last Name');
            const email = queryByPlaceholderText('Email Address');
            const username = queryByPlaceholderText('Username');
            const password = queryByPlaceholderText('Password');
            const confirm_password = queryByPlaceholderText('Confirm Password');
            // const bdate = queryByPlaceholderText('Birthday');

            fireEvent.change(name, {target: {value: data.name}});
            fireEvent.change(surname, {target: {value: data.surname}});
            fireEvent.change(email, {target: {value: data.email}});
            // fireEvent.change(bdate, {target: {value: data.bdate}});
            fireEvent.change(username, {target: {value: data.username}});
            fireEvent.change(password, {target: {value: data.password}});
            fireEvent.change(confirm_password,{target: {value: data.confirm_password}});

            expect(name).toHaveValue(data.name);
            expect(surname).toHaveValue(data.surname);
            expect(email).toHaveValue(data.email);
            expect(username).toHaveValue(data.username);
            expect(password).toHaveValue(data.password);
            expect(confirm_password).toHaveValue(data.confirm_password);
        });
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