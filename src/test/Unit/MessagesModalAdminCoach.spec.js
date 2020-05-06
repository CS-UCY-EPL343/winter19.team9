import React    from 'react';
import {render} from '@testing-library/react';
import MessagesModalAdminCoach
                from '../../components/common/MessagesModalAdminCoach';

function ByPass(props) {
  return <MessagesModalAdminCoach { ...props } />;
}

describe('<MessagesModalAdminCoach />', () => {
  const data = [
    {
      Title       : 'Testing0',
      Message     : 'Testing Message0',
      To_Name     : 'John',
      To_Surname  : 'Sopho',
      To_level    : 'Coach',
      From_Name   : 'Mary',
      From_Surname: 'Poppins',
      From_level  : 'User',
      Timestamp   : '2020-02-24T11:08:33.000Z',
      outgoing    : 1,
      hasSeen     : true,
    },
    {
      Title       : 'Testing1',
      Message     : 'Testing Message1',
      From_Name   : 'John',
      From_Surname: 'Sopho',
      From_level  : 'Coach',
      To_Name     : 'Mary',
      To_Surname  : 'Poppins',
      To_level    : 'User',
      Timestamp   : '2020-02-24T14:08:33.000Z',
      outgoing    : 0,
      hasSeen     : false,
    },
  ];

  it('renders correctly', () => {
    const {container} = render(<ByPass />);
    expect(container.firstChild).toBeTruthy();
  });

  describe('check inserted data', () => {
    it('check messages count', () => {
      const {getAllByTestId} = render(
          <ByPass testLoading = { true } messages = { data } />);

      expect(getAllByTestId('messageDiv').length).toEqual(data.length);
    });

    it('check messages info', () => {
      const {getAllByTestId} = render(
          <ByPass testLoading = { true } messages = { data } />);

      const titles = getAllByTestId('title');
      const messages = getAllByTestId('message');
      const toContacts = getAllByTestId('toContact');
      const fromContacts = getAllByTestId('fromContact');
      const timestamps = getAllByTestId('timestamp');
      for (let i = 0; i < getAllByTestId('message').length; i++) {
        expect(titles[i]).toHaveTextContent(data[i].Title);
        expect(messages[i]).toHaveTextContent(data[i].Message);
        expect(toContacts[i])
            .toHaveTextContent(
                data[i].To_Name + ' ' + data[i].To_Surname + ' - '
                + data[i].To_level.toUpperCase());
        expect(fromContacts[i])
            .toHaveTextContent(
                data[i].From_Name + ' ' + data[i].From_Surname + ' - '
                + data[i].From_level.toUpperCase());
        expect(timestamps[i])
            .toHaveTextContent(data[i].Timestamp.split(/[T.]+/)[0]
                               + ' '
                               + data[i].Timestamp.split(/[T.]+/)[1]);
      }
    });
  });
});