import ExerciceScreen from '../ExerciceScreen';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

describe('Séances & exercices screen', () => {
  const initialState = {
    exercices: [],
  };
  const mockStore = configureStore(middlewares);
  let store;

  //Doit y avoir un bouton + en bas
  it('should have a + button', () => {
    store = mockStore(initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        <ExerciceScreen />
      </Provider>
    );

    expect(queryByTestId('plusButton')).toBeDefined();
  });
  //Doit pouvoir ajouter un exo, ou une seance
});
