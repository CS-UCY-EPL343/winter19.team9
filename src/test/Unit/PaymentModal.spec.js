import React from 'react';
import {render} from '@testing-library/react';
import PaymentModal from '../../components/common/PaymentModal';

function ByPass(props) {
    return <PaymentModal {...props} />;
}

describe('<PaymentModal />', () => {
    it('renders correctly', () => {
       // const PaymentModal = {};

        const {container} = render(<ByPass

        />);

        expect(container.firstChild).toBeTruthy();

    });

});