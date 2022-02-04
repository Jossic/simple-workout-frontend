import SignInScreen from '../SignInScreen';
import { queryByRole, render, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

// import { userEvent } from '@testing-library/react-native';
// import { setupServer } from 'msw/node';
// import { rest } from 'msw';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('>SignIn Screen', () => {
  const initialState = {
    userId: null,
    token: null,
    didTryAutoLogin: false,
  };
  const mockStore = configureStore();
  let store;
  describe('>Layout', () => {
    it('should have email input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <SignInScreen />
        </Provider>
      );

      expect(getByTestId('email')).toBeDefined();
    });
    it('should have password input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <SignInScreen />
        </Provider>
      );

      expect(getByTestId('password')).toBeDefined();
    });

    it.skip('should have password type for password input', async () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <SignInScreen />
        </Provider>
      );

      const input = await getByTestId('password');
      // expect(getByTestId('password')).toBe(true);
    });

    it('should have sign in button', () => {
      store = mockStore(initialState);
      const { getByText } = render(
        <Provider store={store}>
          <SignInScreen />
        </Provider>
      );
      const button = getByText('Se connecter');
      expect(button).toBeTruthy();
    });

  });

  //   describe('Interactions', () => {
  //     let requestBody;
  //     let counter = 0;
  //     const server = setupServer(
  //       rest.post('/api/1.0/users', (req, res, ctx) => {
  //         requestBody = req.body;
  //         counter += 1;
  //         return res(ctx.status(200));
  //       })
  //     );
  //     beforeEach(() => {
  //       counter = 0;
  //       server.resetHandlers();
  //     });
  //     beforeAll(() => server.listen());
  //     afterAll(() => server.close());

  //     let button, usernameInput, emailInput, passwordInput, passwordRepeatInput;

  //     const setup = () => {
  //       render(<SignInScreen />);
  //       usernameInput = screen.getByLabelText('Username');
  //       emailInput = screen.getByLabelText('E-mail');
  //       passwordInput = screen.getByLabelText('Password');
  //       passwordRepeatInput = screen.getByLabelText('Password Repeat');
  //       userEvent.type(usernameInput, 'user1');
  //       userEvent.type(emailInput, 'user1@mail.com');
  //       userEvent.type(passwordInput, 'Password');
  //       userEvent.type(passwordRepeatInput, 'Password');
  //       button = screen.queryByRole('button', { name: 'Sign Up' });
  //     };

  //     it('should enable the button when passwords are equals', () => {
  //       render(<SignInScreen />);
  //       const passwordInput = screen.getByLabelText('Password');
  //       const passwordRepeatInput = screen.getByLabelText('Password Repeat');
  //       userEvent.type(passwordInput, 'Password');
  //       userEvent.type(passwordRepeatInput, 'Password');
  //       const button = screen.queryByRole('button', { name: 'Sign Up' });
  //       expect(button).toBeEnabled();
  //     });

  //     it('should sends username, email, password to back after clicking button', async () => {
  //       setup();
  //       userEvent.click(button);
  //       // const mockFn = jest.fn();
  //       // axios.post = mockFn;
  //       // window.fetch = mockFn;

  //       await screen.findByText(
  //         'Please check your e-mail to activate your account'
  //       );
  //       // const firstCallOfMockFunction = mockFn.mock.calls[0];
  //       // const body = firstCallOfMockFunction[1];
  //       // const body = JSON.parse(firstCallOfMockFunction[1].body);
  //       expect(requestBody).toEqual({
  //         username: 'user1',
  //         email: 'user1@mail.com',
  //         password: 'Password',
  //       });
  //     });

  //     it('should disables button when api is calling', async () => {
  //       setup();
  //       userEvent.click(button);
  //       userEvent.click(button);

  //       await screen.findByText(
  //         'Please check your e-mail to activate your account'
  //       );
  //       expect(counter).toBe(1);
  //     });

  //     it('should display spinner after clicking submit', async () => {
  //       setup();
  //       expect(screen.queryByRole('status')).not.toBeInTheDocument();
  //       userEvent.click(button);
  //       const spinner = screen.getByRole('status');
  //       expect(spinner).toBeInTheDocument();
  //       await screen.findByText(
  //         'Please check your e-mail to activate your account'
  //       );
  //     });

  //     it('should display activation notif after succes signup request', async () => {
  //       setup();
  //       const message = 'Please check your e-mail to activate your account';
  //       expect(screen.queryByText(message)).not.toBeInTheDocument();
  //       userEvent.click(button);
  //       const text = await screen.findByText(message);
  //       expect(text).toBeInTheDocument();
  //     });

  //     it('should hides form after success signup request', async () => {
  //       setup();
  //       const form = screen.getByTestId('form-sign-up');
  //       userEvent.click(button);
  //       await waitFor(() => {
  //         expect(form).not.toBeInTheDocument();
  //       });
  //       // await waitForElementToBeRemoved(form);
  //     });

  //     const generateValidationError = (field, message) => {
  //       return rest.post('/api/1.0/users', (req, res, ctx) => {
  //         return res(
  //           ctx.status(400),
  //           ctx.json({
  //             validationErrors: {
  //               [field]: message,
  //             },
  //           })
  //         );
  //       });
  //     };

  //     it.each`
  //       field         | message
  //       ${'username'} | ${'Username cannot be null'}
  //       ${'email'}    | ${'E-mail cannot be null'}
  //       ${'password'} | ${'Password must be at least 6 characters'}
  //     `('should displays $message for $field', async ({ field, message }) => {
  //       server.use(generateValidationError(field, message));
  //       setup();
  //       userEvent.click(button);
  //       const validationError = await screen.findByText(message);
  //       expect(validationError).toBeInTheDocument();
  //     });

  //     it('should hides spinner and enable button after response received', async () => {
  //       server.use(
  //         generateValidationError('username', 'Username cannot be null')
  //       );

  //       setup();
  //       userEvent.click(button);
  //       await screen.findByText('Username cannot be null');
  //       expect(screen.queryByRole('status')).not.toBeInTheDocument();
  //       expect(button).toBeEnabled();
  //     });

  //     it('should display mismatch error for password repeat input', () => {
  //       setup();
  //       userEvent.type(passwordInput, 'P4ssword');
  //       userEvent.type(passwordRepeatInput, 'OtherP4ssword');
  //       const validationError = screen.queryByText('Passwords mismatch');
  //       expect(validationError).toBeInTheDocument();
  //     });

  //     it.each`
  //       field         | message                                     | label
  //       ${'username'} | ${'Username cannot be null'}                | ${'Username'}
  //       ${'email'}    | ${'E-mail cannot be null'}                  | ${'E-mail'}
  //       ${'password'} | ${'Password must be at least 6 characters'} | ${'Password'}
  //     `(
  //       'should clear validation error after $field field is ok',
  //       async ({ field, message, label }) => {
  //         server.use(generateValidationError(field, message));
  //         setup();
  //         userEvent.click(button);
  //         const validationError = await screen.findByText(message);
  //         userEvent.type(screen.getByLabelText(label), 'updated');
  //         expect(validationError).not.toBeInTheDocument();
  //       }
  //     );
  //   });
});
