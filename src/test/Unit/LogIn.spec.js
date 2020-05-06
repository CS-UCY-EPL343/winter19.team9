import React from 'react';
import {render} from '@testing-library/react';
import LogIn from '../../components/common/LogIn';

function ByPass(props) {
    return <LogIn {...props} />;
}

describe('<LogIn />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass testLoading={true}/>);
        expect(container.firstChild).toHaveClass('forgot-passsword');

    });

});