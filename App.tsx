import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './store/reducers/authReducers';
import workoutReducer from './store/reducers/workoutReducers';
import thunk from 'redux-thunk';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const rootReducer = combineReducers({
  auth: authReducer,
  workout: workoutReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
  // }
}
