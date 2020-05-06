import React from 'react';
import {render} from '@testing-library/react';
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

});