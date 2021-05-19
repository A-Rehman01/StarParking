import React, {useState, useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import Store from './Store';
import {CheckUserLogin} from './Store/actions/userActions';

const App = () => {
  useEffect(() => {
    Store.dispatch(CheckUserLogin());
  }, []);

  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
};

export default App;
