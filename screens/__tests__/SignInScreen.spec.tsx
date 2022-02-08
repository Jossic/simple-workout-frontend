import SignInScreen from '../SignInScreen';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';

const WrapperForm = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

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
    it.skip('should have email input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <SignInScreen />
        </Provider>
      );

      expect(getByTestId('email')).toBeDefined();
    });
    it.skip('should have password input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <SignInScreen />
        </Provider>
      );

      expect(getByTestId('password')).toBeDefined();
    });

    it.skip('should trigger error for wrong email', async () => {
      store = mockStore(initialState);
      const { getByTestId, queryByTestId, getByText } = render(
        <Provider store={store}>
          <WrapperForm>
            <SignInScreen />
          </WrapperForm>
        </Provider>
      );

      act(() => {
        const email = getByTestId('email');
        fireEvent.changeText(email, {
          target: { value: 'invalid email' },
        });
        fireEvent.press(getByTestId('submitAuth'));
      });

      await waitFor(() =>
        expect(getByText('Merci de saisir un mail valide')).toBeTruthy()
      );
    });

    it.skip('should trigger error for empty email', async () => {
      store = mockStore(initialState);
      const { getByTestId, queryByTestId, getByText } = render(
        <Provider store={store}>
          <WrapperForm>
            <SignInScreen />
          </WrapperForm>
        </Provider>
      );

      act(() => {
        fireEvent.press(getByTestId('submitAuth'));
      });

      await waitFor(() =>
        expect(getByText('Veuillez renseigner votre email')).toBeTruthy()
      );
    });

    it.skip('should trigger error for empty password', async () => {
      store = mockStore(initialState);
      const { getByTestId, queryByTestId, getByText } = render(
        <Provider store={store}>
          <WrapperForm>
            <SignInScreen />
          </WrapperForm>
        </Provider>
      );

      act(() => {
        fireEvent.press(getByTestId('submitAuth'));
      });

      await waitFor(() =>
        expect(getByText('Veuillez renseigner votre mot de passe')).toBeTruthy()
      );
    });

    it.skip('should trigger error for wrong password', async () => {
      store = mockStore(initialState);
      const { getByTestId, queryByTestId, getByText } = render(
        <Provider store={store}>
          <WrapperForm>
            <SignInScreen />
          </WrapperForm>
        </Provider>
      );

      act(() => {
        const password = getByTestId('password');
        fireEvent.changeText(password, {
          target: { value: 'aaaaaaaaaaaaa' },
        });
        fireEvent.press(getByTestId('submitAuth'));
      });

      await waitFor(() =>
        expect(
          getByText(
            'Votre mot de passe doit contenir un majuscule, une minuscule, un nombre et un caractère spécial'
          )
        ).toBeTruthy()
      );
    });

    it.skip('should trigger error for short password', async () => {
      store = mockStore(initialState);
      const { getByTestId, queryByTestId, getByText } = render(
        <Provider store={store}>
          <WrapperForm>
            <SignInScreen />
          </WrapperForm>
        </Provider>
      );

      act(() => {
        const password = getByTestId('password');
        fireEvent.changeText(password, {
          target: { value: 'aaaaa' },
        });
        fireEvent.press(getByTestId('submitAuth'));
      });

      await waitFor(() =>
        expect(getByText('Saisir au moins 8 caractères')).toBeTruthy()
      );
    });

    it.skip('call the onSubmit function', async () => {
      store = mockStore(initialState);
      const { getByTestId, queryByTestId, toJSON } = render(
        <Provider store={store}>
          <SignInScreen />
        </Provider>
      );
      const email = getByTestId('email');
      fireEvent.changeText(email, {
        target: { value: 'test@test.com' },
      });
      const password = getByTestId('password');
      fireEvent.changeText(password, {
        target: { value: '123456' },
      });

      const button = getByTestId('submitAuth');
      fireEvent.press(button);

      await waitFor(() => expect(queryByTestId('submitAuth')).toBeTruthy());
    });

    it.skip('should have sign in button', () => {
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
});
