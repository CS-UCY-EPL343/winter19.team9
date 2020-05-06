import React from 'react';
import {render} from '@testing-library/react';
import EventsModal from '../../components/common/EventsModal';

function ByPass(props) {
    return <EventsModal {...props} />;
}

describe('<EventsModal />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass/>);
        expect(container.firstChild).toBeTruthy();
    });

});