import React from 'react';
import {render} from '@testing-library/react';
import AnnouncementCompPub from '../../components/common/AnnouncementCompPub';

function ByPass(props) {
    return <AnnouncementCompPub {...props} />;
}

describe('<LoginModal />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass testLoading={true}/>);
        expect(container.firstChild).toBeTruthy();
    });

});