import React from 'react';
import {render} from '@testing-library/react';
import ProfileInfo from '../../components/common/ProfileInfo';

function ByPass(props) {
    return <ProfileInfo {...props} />;
}

describe('<ProfileInfo />', () => {
    it('renders correctly', () => {
        //const ProfileInfo = {};

        const {container} = render(<ByPass
        />);
        expect(container.firstChild).toHaveClass('col-lg-4 col-md-12 col-sm-12');
    });

});