import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import SelectionPT from '../../components/common/SelectionPT';

function ByPass(props) {
    return <SelectionPT {...props} />;
}

describe('<SelectionPT />', () => {
    it('renders correctly', () => {
        //const SelectionPT = {};

        const {container} = render(<ByPass coaches = {[]}
        />);
        expect(container.firstChild).toBeTruthy();
    });

    it('Submit-Button', () => {
        const testSubmit = jest.fn();
        const {queryByTestId} = render(
            <ByPass testLoading={true} testSubmit={testSubmit} coaches = {[]}
            />);
        fireEvent.click(queryByTestId('button'));
        expect(testSubmit).toHaveBeenCalled();
    });
    it('Delete-Button', () => {
        const testSubmit = jest.fn();
        const {queryByTestId} = render(
            <ByPass testLoading={true} testSubmit={testSubmit} coaches = {[]}
            />);
        fireEvent.click(queryByTestId('delete-button'));
        expect(testSubmit).toHaveBeenCalled();
    });

});