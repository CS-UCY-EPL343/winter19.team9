import React from 'react';
import {render} from '@testing-library/react';
import Graphs from '../../components/common/Graphs';

function ByPass(props) {
    return <Graphs {...props} />;
}

describe('<Graphs />', () => {
    it('renders correctly', () => {
        let ys;
        const {container} = render(<ByPass testLoading={true}/>);
        expect(container.firstChild).toHaveClass('charts');
    });

});