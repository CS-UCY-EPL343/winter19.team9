import React from 'react';
import {render} from '@testing-library/react';
import SettingsProfile from '../../components/common/SettingsProfile';

function ByPass(props) {
    return <SettingsProfile {...props} />;
}

describe('<SettingsProfile />', () => {
    it('renders correctly', () => {
        const SettingsProfile = {};

        const {container} = render(<ByPass

        />);
        expect(container.firstChild).toHaveClass('col-lg-4 col-md-12 col-sm-12');
    });

});