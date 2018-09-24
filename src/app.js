import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import { startLogin, login, logout } from './actions/auth';
// import 'normalize.css/normalize.css';
// import './styles/styles.scss';
// import 'react-dates/lib/css/_datepicker.css';
//import 'semantic-ui-css/semantic.min.css';

import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage'

import { startFetchUser } from './actions/user';
import { startFetchRandomWord } from './actions/words';

import { userAlreadyExists, addNewUser, getUser } from './datasources/users';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

const init = (user) => {
  const userUID = user.uid;
  userAlreadyExists(userUID).then((exists) => {
    let promise = new Promise((resolve) => { resolve(); });
    if (!exists)
      promise = addNewUser(user);

    promise.then(() => {
      store.dispatch(startFetchUser(userUID)).then(() => {
        const resultUser = store.getState().user;
        Promise.all([store.dispatch(login(resultUser)), store.dispatch(startFetchRandomWord(resultUser)),]).then(() => {
          
          renderApp();
          if (history.location.pathname === '/') {
            history.push('/dashboard');
          }

        })
      });
    })
  })
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    init(user);
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
