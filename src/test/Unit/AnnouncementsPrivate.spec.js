import React from 'react';
import {render} from '@testing-library/react';
import AnnouncementsPrivate from '../../components/common/AnnouncementsPrivate';

function ByPass(props) {
    return <AnnouncementsPrivate {...props} />;
}

describe('<AnnouncementsPrivate />', () => {
    it('renders correctly', () => {
        const AnnouncementsPrivate = {};

        const {container} = render(<ByPass

        />);

    });

});