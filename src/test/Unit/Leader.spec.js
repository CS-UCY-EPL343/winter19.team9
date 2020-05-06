import React from 'react';
import {render} from '@testing-library/react';
import Leader from '../../components/common/Leader';

function ByPass(props) {
    return <Leader {...props} />;
}

describe('<Leader />', () => {
    it('renders correctly', () => {
        const Leader = {};

        const {container} = render(<ByPass

        />);

    });

});