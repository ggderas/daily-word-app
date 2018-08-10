import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import { startLogin, login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage'

import { fetchUserData } from './actions/user';
import { startFetchRandomWord } from './actions/randomWord';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;

store.dispatch(fetchUserData())

let excludeWords = (store.getState().user.words || []).map((w) => w.name);
store.dispatch(startFetchRandomWord(excludeWords));

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

//store.dispatch(startLogin());
ReactDOM.render(jsx, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  console.log("user",user);
  if (user) {
    console.log("history.location.pathname", history.location.pathname);
    store.dispatch(login(user));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
