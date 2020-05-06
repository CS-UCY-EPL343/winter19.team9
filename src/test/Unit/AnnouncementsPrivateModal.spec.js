import React from 'react';
import {render} from '@testing-library/react';
import AnnouncementsPrivateModal from '../../components/common/AnnouncementsPrivateModal';

function ByPass(props) {
    return <AnnouncementsPrivateModal {...props} />;
}

describe('<AnnouncementsPrivateModal />', () => {
    it('renders correctly', () => {
        const AnnouncementsPrivateModal = {};

        const {container} = render(<ByPass

        />);

    });

});