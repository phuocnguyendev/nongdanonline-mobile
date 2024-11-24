import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { StatusBar } from 'react-native'
import 'react-native-get-random-values'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import i18n from './src/i8n/i8n'
import { Navigator } from './src/navigators'
import store, { persistor } from './src/store/store'
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <StatusBar translucent={true} backgroundColor="transparent" />
          <Navigator />
          <Toast />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  )
}
