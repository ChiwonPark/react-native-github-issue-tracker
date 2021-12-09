import React from 'react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './navigators/RootNavigator';
import {store, persistor} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
        <Toast position="bottom" bottomOffset={64} />
      </PersistGate>
    </Provider>
  );
};

export default App;
