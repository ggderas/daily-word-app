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

import { fetchUser } from './actions/user';
import { startFetchRandomWord } from './actions/words';

import { userAlreadyExists, addNewUser, getUser } from './datasources/users';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;

// let excludeWords = (store.getState().user.words || []).map((w) => w.name);
// 

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(jsx, document.getElementById('app'));

// userAlreadyExists("sq3coFCmtngGUb6ebIzaBlQu2Lg1").then((itExists) => {
//   console.log("itExists",itExists)
// });
// addNewUser({email: "lmrderas@gmail.com", displayName: "Luis Deras", photoURL: "myPhotoURL.com", uid: "sq3coFCmtngGUb6ebIzaBlQu2Lg1"});

firebase.auth().onAuthStateChanged((user) => {
  let userExists = false;

  console.log("user", user);
  if (user) {

    userAlreadyExists(user.uid).then((exists) => {
      let promise = new Promise((resolve) => { resolve(); });
      if (!exists)
        promise = addNewUser(user);

      promise.then(() => {
        getUser(user.uid).then((result) => {
          store.dispatch(fetchUser(result));
          store.dispatch(startFetchRandomWord(result));
          console.log("history.location.pathname", history.location.pathname);

          setTimeout(() => {
            renderApp();
            if (history.location.pathname === '/') {
              console.log("here");
              history.push('/dashboard');
            }            
          }, 5000);


        });
      })
    })


    // console.log("history.location.pathname", history.location.pathname);
    // store.dispatch(login(user));
    // store.dispatch(startFetchRandomWord(excludeWords));
    // renderApp();
    // if (history.location.pathname === '/') {
    //   history.push('/dashboard');
    // }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
