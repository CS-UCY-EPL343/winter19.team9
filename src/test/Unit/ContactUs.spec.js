import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import ContactUs from '../../components/common/ContactUs';

function ByPass(props) {
    return <ContactUs {...props} />;
}

describe('<ContactUs />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass contact={{
            'Name': 'Antonis',
            'Phone': '99676767',
            'Email': 'antonis@testing.com',
        }}
        />);

        expect(container.firstChild).toBeTruthy();
    });
    describe('input values', () => {
        const data = {
            'name': 'Antonis',
            'phone': '1-800-test',
            'email': 'test@testing.com',
            'message': 'Sample Message',
        };
        it('check user data', () => {
            const {queryByPlaceholderText} = render(
                <ByPass contact={'contact'}/>);

            const name = queryByPlaceholderText('Name');
            const email = queryByPlaceholderText('Email');
            const phone = queryByPlaceholderText('Phone');
            const message = queryByPlaceholderText('Message');


            expect(name).toBeEmpty();
            expect(email).toBeEmpty();
            expect(phone).toBeEmpty();
            expect(message).toBeEmpty();
        });

        it('change input data', () => {
            const {queryByPlaceholderText} = render(
                <ByPass contact={'contact'}/>);

            const name = queryByPlaceholderText('Name');
            const email = queryByPlaceholderText('Email');
            const phone = queryByPlaceholderText('Phone');
            const message = queryByPlaceholderText('Message');


            fireEvent.change(name, {target: {value: data.name}});
            fireEvent.change(email, {target: {value: data.email}});
            fireEvent.change(phone, {target: {value: data.phone}});
            fireEvent.change(message, {target: {value: data.message}});


            expect(name).toHaveValue(data.name);
            expect(email).toHaveValue(data.email);
            expect(phone).toHaveValue(data.phone);
            expect(message).toHaveValue(data.message);

        });

        it('Submit-Button', () => {
            const testSubmit = jest.fn();

            const {queryByTestId} = render(
                <ByPass contact={'contact'} testSubmit={testSubmit}
                />);
            fireEvent.click(queryByTestId('button'));
            expect(testSubmit).toHaveBeenCalled();
        });

    });


});