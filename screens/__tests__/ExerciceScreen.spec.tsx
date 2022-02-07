import ExerciceScreen from '../ExerciceScreen';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Séances & exercices screen', () => {
  const initialState = {
    exercices: [],
  };
  const mockStore = configureStore();
  let store;

  //Doit y avoir un bouton + en bas
  it('should have a + button', () => {
    store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <ExerciceScreen />
      </Provider>
    );
    // const button = getByTestId('plusButton');
    // expect(button).toBeTruthy();
    expect(getByTestId('plusButton')).toBeDefined();
  });
  //Doit pouvoir ajouter un exo, ou une seance
});
