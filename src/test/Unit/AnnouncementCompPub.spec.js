import React        from 'react';
import {render}     from '@testing-library/react';
import AnnouncementCompPub from '../../components/common/AnnouncementCompPub';

function ByPass(props) {
    return <AnnouncementCompPub { ...props } />;
}

describe('<AnnouncementCompPub />', () => {
    it('renders correctly', () => {
        const AnnouncementCompPub = {

        };

        const {container} = render(<ByPass

        />);

    });

});