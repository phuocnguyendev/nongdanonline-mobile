import './global.css';

import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-get-random-values';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Navigator } from './src/navigators';
import store, { persistor } from './src/store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <Navigator />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
