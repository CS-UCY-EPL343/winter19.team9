import React from 'react';
import {render} from '@testing-library/react';
import AnnouncementsPublic from '../../components/common/AnnouncementsPublic';

function ByPass(props) {
    return <AnnouncementsPublic {...props} />;
}

describe('<AnnouncementsPublic />', () => {
    it('renders correctly', () => {
        const AnnouncementsPublic = {};

        const {container} = render(<ByPass

        />);

    });

});