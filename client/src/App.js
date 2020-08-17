import React from 'react';

import Alerts from './components/layout/Alerts';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';
import { AuthContainer } from './components/Containers/AuthContainer';
import { DefaultContainer } from './components/Containers/DefaultContainer';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Alerts />
          <Route exact path='/auth' component={AuthContainer} />
          <PrivateRoute component={DefaultContainer} />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
