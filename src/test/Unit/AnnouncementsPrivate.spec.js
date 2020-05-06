import React                from 'react';
import {render}             from '@testing-library/react';
import AnnouncementsPrivate from '../../components/common/AnnouncementsPrivate';

function ByPass(props) {
  return <AnnouncementsPrivate { ...props } />;
}

describe('<AnnouncementsPrivate />', () => {
  it('renders correctly', () => {
    const {container} = render(<ByPass />);

    expect(container.firstChild).toBeTruthy();
  });

  it('create announcements', () => {
    const announcements = [
      {ANNOUNCEMENT_ID: 0, Title: 'Test0', Message: 'Testing0'},
      {ANNOUNCEMENT_ID: 1, Title: 'Test1', Message: 'Testing1'},
      {ANNOUNCEMENT_ID: 2, Title: 'Test2', Message: 'Testing2'},
      {ANNOUNCEMENT_ID: 3, Title: 'Test3', Message: 'Testing3'},
    ];

    const {getAllByTestId} = render(
        <ByPass testLoading = { true } announcements = { announcements } />);

    const divs = getAllByTestId('announcement');
    const titles = getAllByTestId('title');
    const messages = getAllByTestId('message');

    expect(divs.length).toEqual(announcements.length);
    for (let i = 0; i < titles.length; i++) {
      expect(titles[i].textContent).toEqual(announcements[i].Title);
      expect(messages[i].textContent).toEqual(announcements[i].Message);
    }
  });
});