import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import SignUp from '../../components/common/SignUp';

function ByPass(props) {
    return <SignUp {...props} />;
}

describe('<SignUp />', () => {
    it('renders correctly', () => {
        const SignUp = {};

        const {container} = render(<ByPass

        />);
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