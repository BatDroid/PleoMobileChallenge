import React from 'react';
import {Provider} from 'react-redux';
import RootNavigation from './src/config/navigation';
import store from './src/config/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
