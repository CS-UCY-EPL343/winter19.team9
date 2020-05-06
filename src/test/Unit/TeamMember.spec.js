import React from 'react';
import {render} from '@testing-library/react';
import TeamMember from '../../components/common/TeamMember';

function ByPass(props) {
    return <TeamMember {...props} />;
}

describe('<TeamMember />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toBeTruthy();
    });

    it ('class name passed correctly', () =>{
        const {container} = render(<ByPass
            class = {'sample'}
            source = {'www.google.com'}
            name = {'Kostas'}
            text = {'So good'}
        />);

        expect(container.firstChild.childNodes[1].firstChild.firstChild).toHaveTextContent('Kostas');
        expect(container.firstChild.childNodes[1].childNodes[1].firstChild).toHaveTextContent('So good');

    });
});