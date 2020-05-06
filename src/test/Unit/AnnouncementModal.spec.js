import React from 'react';
import {render} from '@testing-library/react';
import AnnouncementModal from '../../components/common/AnnouncementModal';

function ByPass(props) {
    return <AnnouncementModal {...props} />;
}

describe('<AnnouncementModal />', () => {
    it('renders correctly', () => {
        const AnnouncementModal = {};

        const {container} = render(<ByPass

        />);

    });

});