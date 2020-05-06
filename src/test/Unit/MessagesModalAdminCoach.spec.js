import React from 'react';
import {render} from '@testing-library/react';
import MessagesModalAdminCoach from '../../components/common/MessagesModalAdminCoach';

function ByPass(props) {
    return <MessagesModalAdminCoach {...props} />;
}

describe('<MessagesModalAdminCoach />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass testLoading={true}/>);
        expect(container.firstChild).toBeTruthy();
    });

});