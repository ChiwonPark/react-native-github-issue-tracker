import React from 'react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import RootNavigator from './navigators/RootNavigator';
import {store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast position="bottom" bottomOffset={64} />
    </Provider>
  );
};

export default App;
