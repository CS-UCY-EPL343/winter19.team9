import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import MessagesNewModalForm from '../../components/common/MessagesNewModalForm';

function ByPass(props) {
    return <MessagesNewModalForm {...props} />;
}

describe('<MessagesNewModalForm />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass recipients={[]} toggle={jest.fn()}/>);
        expect(container.firstChild).toBeTruthy();
    });

    describe('input values', () => {
        const data = {
            // 'rec'           : 'Test',
            'title'         : 'Mc MSG',
            'msg'           : 'content'
        };

        it('check user data', () => {
            const {queryByPlaceholderText} = render(
                <ByPass recipients={[]} toggle={jest.fn()}/>);

            // const rec = queryByPlaceholderText('Select recipient...');
            const title = queryByPlaceholderText('Enter a title...');
            const msg = queryByPlaceholderText('Enter a message...');

            // expect(rec).toBeEmpty();
            expect(title).toBeEmpty();
            expect(msg).toBeEmpty();
        });

        it('change input data', () => {
            const {queryByPlaceholderText} = render(
                <ByPass recipients={[]} toggle={jest.fn()}/>);

            // const rec = queryByPlaceholderText('Select recipient...');
            const title = queryByPlaceholderText('Enter a title...');
            const msg = queryByPlaceholderText('Enter a message...');

            // fireEvent.change(rec, {target: {value: data.rec}});
            fireEvent.change(title, {target: {value: data.title}});
            fireEvent.change(msg, {target: {value: data.msg}});

            // expect(rec).toHaveValue(data.rec);
            expect(title).toHaveValue(data.title);
            expect(msg).toHaveValue(data.msg);
        });
        //
        // describe('<MessagesNewModal />', () => {
        //     it ('button check', () => {
        //         const {queryButton} = render(
        //             <ByPass toggle={jest.fn()}/>
        //         );
        //     });
        // });
    });
});