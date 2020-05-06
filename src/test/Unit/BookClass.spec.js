import React               from 'react';
import {render, fireEvent} from '@testing-library/react';
import BookClass           from '../../components/common/BookClass';

function ByPass(props) {
  return <BookClass { ...props } />;
}

describe('<BookClass />', () => {
  const data = {
    Name     : [{Name: 'trx'}, {Name: 'yoga'}],
    Day      : [{Day: 'Monday'}, {Day: 'Friday'}],
    Time     : [{Time: '17:00'}],
    CoachName: [{CoachName: 'Giorgos'}],
  };

  it('renders correctly', () => {
    const {container} = render(<ByPass />);

    expect(container.firstChild).toBeTruthy();
  });

  it('check options creation', () => {
    const {queryByTestId} = render(<ByPass testLoading = { true }
                                           data = { data }
    />);

    expect(queryByTestId('class-select')).toBeTruthy();
    expect(queryByTestId('day-select')).toBeTruthy();
    expect(queryByTestId('time-select')).toBeTruthy();
    expect(queryByTestId('coach-select')).toBeTruthy();

    expect(queryByTestId('class-select').children.length)
        .toEqual(data.Name.length + 1);
    expect(queryByTestId('day-select').children.length)
        .toEqual(data.Day.length + 1);
    expect(queryByTestId('time-select').children.length)
        .toEqual(data.Time.length + 1);
    expect(queryByTestId('coach-select').children.length)
        .toEqual(data.CoachName.length + 1);
  });

  it('check options selection', () => {
    const {queryByTestId, getByDisplayValue} = render(
        <ByPass testLoading = { true }
                data = { data }
        />);

    expect(queryByTestId('class-select')).toBeTruthy();
    expect(queryByTestId('day-select')).toBeTruthy();
    expect(queryByTestId('time-select')).toBeTruthy();
    expect(queryByTestId('coach-select')).toBeTruthy();

    fireEvent.change(queryByTestId('class-select'),
        {target: {value: data.Name[0].Name}});
    fireEvent.change(queryByTestId('day-select'),
        {target: {value: data.Day[0].Day}});
    fireEvent.change(queryByTestId('time-select'),
        {target: {value: data.Time[0].Time}});
    fireEvent.change(queryByTestId('coach-select'),
        {target: {value: data.CoachName[0].CoachName}});

    expect(getByDisplayValue(data.Name[0].Name)).toBeInTheDocument();
    expect(getByDisplayValue(data.Day[0].Day)).toBeInTheDocument();
    expect(getByDisplayValue(data.Time[0].Time)).toBeInTheDocument();
    expect(getByDisplayValue(data.CoachName[0].CoachName)).toBeInTheDocument();
  });
});