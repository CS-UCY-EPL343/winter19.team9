import React from 'react';
import {render} from '@testing-library/react';
import SelectionPT from '../../components/common/SelectionPT';

function ByPass(props) {
    return <SelectionPT {...props} />;
}

describe('<SelectionPT />', () => {
    it('renders correctly', () => {
        const SelectionPT = {};

        const {container} = render(<ByPass

        />);

    });

});