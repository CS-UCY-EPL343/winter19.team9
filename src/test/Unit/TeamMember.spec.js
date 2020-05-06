import React from 'react';
import {render} from '@testing-library/react';
import TeamMember from '../../components/common/TeamMember';

function ByPass(props) {
    return <TeamMember {...props} />;
}

describe('<TeamMember />', () => {
    it('renders correctly', () => {
        const TeamMember = {};

        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toBeTruthy();
    });

});