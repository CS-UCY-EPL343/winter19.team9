import React from 'react';
import {render} from '@testing-library/react';
import ButtonLoader from '../../components/common/ButtonLoader';

function ByPass(props) {
    return <ButtonLoader {...props} />;
}

describe('<ButtonLoader />', () => {
    it('renders correctly', () => {
        const ButtonLoader = {};

        const {container} = render(<ByPass

        />);

    });

});