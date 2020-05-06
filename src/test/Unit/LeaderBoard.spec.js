import React from 'react';
import {render} from '@testing-library/react';
import LeaderBoard from '../../components/common/LeaderBoard';

function ByPass(props) {
    return <LeaderBoard {...props} />;
}

describe('<LeaderBoard />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass testLoading={true} data={[]}/>);
        expect(container.firstChild).toHaveClass('col-md-6 panel panel-default');
    });

});