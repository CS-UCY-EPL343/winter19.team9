import React from 'react';
import {render} from '@testing-library/react';
import PersonalTrainingCreate from '../../components/common/PersonalTrainingCreate';

function ByPass(props) {
    return <PersonalTrainingCreate {...props} />;
}

describe('<PersonalTrainingCreate />', () => {
    it('renders correctly', () => {
        const PersonalTrainingCreate = {};

        const {container} = render(<ByPass

        />);

    });

});