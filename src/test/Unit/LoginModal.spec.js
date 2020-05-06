import React from 'react';
import {render} from '@testing-library/react';
import AnnouncementCompPub from '../../components/common/AnnouncementCompPub';

function ByPass(props) {
    return <AnnouncementCompPub {...props} />;
}

describe('<LoginModal />', () => {
    it('renders correctly', () => {
        const LoginModal = {};

        const {container} = render(<ByPass

        />);

    });

});