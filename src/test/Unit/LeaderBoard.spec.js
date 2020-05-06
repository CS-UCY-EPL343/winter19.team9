import React       from 'react';
import {render}    from '@testing-library/react';
import LeaderBoard from '../../components/common/LeaderBoard';

function ByPass(props) {
  return <LeaderBoard { ...props } />;
}

describe('<LeaderBoard />', () => {
  const data = {
    data       : [
      {page: 'Test5', views: 5},
      {page: 'Test2', views: 2},
      {page: 'Test3', views: 3},
      {page: 'Test1', views: 1},
      {page: 'Test4', views: 4},
      {page: 'Test8', views: 8},
      {page: 'Test6', views: 6},
      {page: 'Test9', views: 9},
      {page: 'Test7', views: 7},
      {page: 'Test0', views: 0},
    ],
    title      : 'Most Visited Pages',
    dataSort   : 'views',
    dataTitle  : 'page',
    numberComma: 'true',
  };

  it('renders correctly', () => {
    const {container} = render(<ByPass testLoading = { true } data = { [] } />);
    expect(container.firstChild).toHaveClass('col-md-6 panel panel-default');
  });

  describe('check inserted data', () => {
    it('ascending', () => {
      const {getByTestId} = render(<ByPass sortAsc={false} { ...data } />);

      expect(getByTestId('title')).toHaveTextContent(data.title);
      expect(getByTestId('leaders').children.length).toEqual(data.data.length);

      const leaders = getByTestId('leaders').children;
      for(let i = 0; i < data.data.length; i++) {
        expect(leaders[i]).toHaveTextContent('Test' + i + ' - ' + i);
      }
    });

    it('descending', () => {
      const {getByTestId} = render(<ByPass sortAsc={true} { ...data } />);

      expect(getByTestId('title')).toHaveTextContent(data.title);
      expect(getByTestId('leaders').children.length).toEqual(data.data.length);

      const leaders = getByTestId('leaders').children;
      for(let i = 0; i < data.data.length; i++) {
        const j = data.data.length - i - 1;
        expect(leaders[i]).toHaveTextContent('Test' + j + ' - ' + j);
      }
    });
  });
});