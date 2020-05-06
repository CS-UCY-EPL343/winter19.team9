import React                        from 'react';
import {render, fireEvent} from '@testing-library/react';
import EditAccount                  from '../../components/common/EditAccount';

function ByPass(props) {
  return <EditAccount { ...props } />;
}

describe('<EditAccount />', () => {
  it('renders correctly', () => {
    const {container} = render(<ByPass testLoading = { true } />);

    expect(container.firstChild).toHaveClass('container');
  });

  describe('input values', () => {
    const data = {
      'name'            : 'Test',
      'surname'         : 'Mc Testing the 2nd',
      'email'           : 'mc@testing.com',
      'phone'           : '6942069',
      'username'        : 'testing1234',
      'password'        : 'McTesting2',
      'confirm_password': 'McTesting2',
      'medical'         : 'To smart for normal people to understand. Also im autistic.',
    };

    it('check user data', () => {
      const {queryByPlaceholderText} = render(
          <ByPass testLoading = { true } />);

      const name = queryByPlaceholderText('Enter name');
      const surname = queryByPlaceholderText('Enter surname');
      const email = queryByPlaceholderText('Enter email');
      // const phone = queryByPlaceholderText('Enter phone number');
      const username = queryByPlaceholderText('Enter username');
      const password = queryByPlaceholderText('Enter password');
      const confirm_password = queryByPlaceholderText('Confirm password');
      // const medical = queryByPlaceholderText('Enter medical history');

      expect(name).toBeEmpty();
      expect(surname).toBeEmpty();
      expect(email).toBeEmpty();
      // expect(phone).toBeEmpty();
      expect(username).toBeEmpty();
      expect(password).toBeEmpty();
      expect(confirm_password).toBeEmpty();
      // expect(medical).toBeEmpty();
    });

    it('change input data', () => {
      const {queryByPlaceholderText} = render(
          <ByPass testLoading = { true } />);

      const name = queryByPlaceholderText('Enter name');
      const surname = queryByPlaceholderText('Enter surname');
      const email = queryByPlaceholderText('Enter email');
      const phone = queryByPlaceholderText('Enter phone number');
      const username = queryByPlaceholderText('Enter username');
      const password = queryByPlaceholderText('Enter password');
      const confirm_password = queryByPlaceholderText('Confirm password');
      const medical = queryByPlaceholderText('Enter medical history');

      fireEvent.change(name, {target: {value: data.name}});
      fireEvent.change(surname, {target: {value: data.surname}});
      fireEvent.change(email, {target: {value: data.email}});
      fireEvent.change(phone, {target: {value: data.phone}});
      fireEvent.change(username, {target: {value: data.username}});
      fireEvent.change(password, {target: {value: data.password}});
      fireEvent.change(confirm_password,
          {target: {value: data.confirm_password}});
      fireEvent.change(medical, {target: {value: data.medical}});

      expect(name).toHaveValue(data.name);
      expect(surname).toHaveValue(data.surname);
      expect(email).toHaveValue(data.email);
      expect(phone).toHaveValue(data.phone);
      expect(username).toHaveValue(data.username);
      expect(password).toHaveValue(data.password);
      expect(confirm_password).toHaveValue(data.confirm_password);
      expect(medical).toHaveValue(data.medical);
    });
    it('Submit-Button', () => {
      const testSubmit = jest.fn();

      const {queryByTestId} = render(
          <ByPass testLoading={true} testSubmit={testSubmit}
          />);
      fireEvent.click(queryByTestId('button'));
      expect(testSubmit).toHaveBeenCalled();
    });
    //button-delete
    it('Delete-Button', () => {
      const testSubmit = jest.fn();

      const {queryByTestId} = render(
          <ByPass testLoading={true} testSubmit={testSubmit}
          />);
      fireEvent.click(queryByTestId('button-delete'));
      expect(testSubmit).toHaveBeenCalled();
    });

    it('Reset-Button', () => {
      const testSubmit = jest.fn();

      const {queryByTestId} = render(
          <ByPass testLoading={true} testSubmit={testSubmit}
          />);
      fireEvent.click(queryByTestId('button-reset'));
      expect(testSubmit).toHaveBeenCalled();
    });


  });
});