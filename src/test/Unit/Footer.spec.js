import React from 'react';
import {render} from '@testing-library/react';
import Footer from '../../components/common/Footer';

function ByPass(props) {
    return <Footer {...props} />;
}

describe('<Footer />', () => {
    it('renders correctly', () => {
        const {container} = render(<ByPass testLoading={true}
                                           stylesheetData={{social: {}, 'about-us': {}, 'about-club': []}}/>);
        expect(container.firstChild).toBeTruthy();
    });
});