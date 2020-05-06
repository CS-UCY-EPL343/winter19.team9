import React from 'react';
import {render} from '@testing-library/react';
import Team from '../../components/common/Team';

function ByPass(props) {
    return <Team {...props} />;
}

describe('<Team />', () => {
    it('renders correctly', () => {
        const Team = {};

        const {container} = render(<ByPass coaches = {[]} />);
        expect(container.firstChild).toHaveClass('page-section');
    });

});