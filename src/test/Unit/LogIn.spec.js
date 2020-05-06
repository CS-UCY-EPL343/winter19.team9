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