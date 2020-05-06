import React from 'react';
import {render} from '@testing-library/react';
import ToggleModal from '../../components/common/ToggleModal';
import SelectionPTCoach from "../../components/common/SelectionPTCoach";

function ByPass(props) {
    return <ToggleModal {...props} />;
}

describe('<ToggleModal />', () => {
    it('renders correctly', () => {
        const ToggleModal = {};

        const {container} = render(<ByPass modalBody = {<SelectionPTCoach/>}

        />);
        expect(container.firstChild).toBeTruthy();

    });

});