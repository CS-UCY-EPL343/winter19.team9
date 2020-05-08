import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import SelectionPTCoach from '../../components/common/SelectionPTCoach';

function ByPass(props) {
    return <SelectionPTCoach {...props} />;
}

describe('<SelectionPTCoach />', () => {
    it('renders correctly', () => {
        //const SelectionPT = {};

        const {container} = render(<ByPass />);
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
    it('Delete-Button', () => {
        const testSubmit = jest.fn();
        const {queryByTestId} = render(
            <ByPass testLoading={true} testSubmit={testSubmit}
            />);
        fireEvent.click(queryByTestId('delete-button'));
        expect(testSubmit).toHaveBeenCalled();
    });

});