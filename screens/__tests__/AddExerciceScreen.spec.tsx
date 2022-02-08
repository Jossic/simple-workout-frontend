import AddExerciceScreen from '../AddExerciceScreen';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { FormProvider, useForm } from 'react-hook-form';
import { act } from 'react-test-renderer';

const WrapperForm = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const initialState = {
  auth: {
    userId: null,
    token: null,
  },
  workout: {
    exercices: [],
  },
};
const mockStore = configureStore();
let store;
describe('AddExerciceScreen', () => {
  describe('input', () => {
    it('should have image input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <AddExerciceScreen navigation />
        </Provider>
      );

      expect(getByTestId('image')).toBeDefined();
    });

    it('should have name input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <AddExerciceScreen navigation />
        </Provider>
      );

      expect(getByTestId('name')).toBeDefined();
    });
    it('should have variant input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <AddExerciceScreen navigation />
        </Provider>
      );

      expect(getByTestId('variant')).toBeDefined();
    });
    it('should have description input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <AddExerciceScreen navigation />
        </Provider>
      );

      expect(getByTestId('description')).toBeDefined();
    });
    it('should have instructions input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <AddExerciceScreen navigation />
        </Provider>
      );

      expect(getByTestId('instructions')).toBeDefined();
    });

    it('should have type input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <AddExerciceScreen navigation />
        </Provider>
      );

      expect(getByTestId('type')).toBeDefined();
    });
    it('should have unit input', () => {
      store = mockStore(initialState);
      const { getByTestId } = render(
        <Provider store={store}>
          <AddExerciceScreen navigation />
        </Provider>
      );

      expect(getByTestId('unit')).toBeDefined();
    });
  });

  describe('error on input', () => {
    it('should trigger error for empty exercice name', async () => {
      store = mockStore(initialState);
      const { getByTestId, getByText } = render(
        <Provider store={store}>
          <WrapperForm>
            <AddExerciceScreen navigation />
          </WrapperForm>
        </Provider>
      );

      act(() => {
        fireEvent.press(getByTestId('submitEx'));
      });

      await waitFor(() =>
        expect(getByText("Merci de renseigner un nom d'exercice")).toBeTruthy()
      );
    });
  });
});
