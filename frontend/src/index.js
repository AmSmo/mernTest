import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken, preAuth } from './util/session_api_util';
import { logout } from './actions/session_actions';
import App from './components/app';
import reportWebVitals from './reportWebVitals';

let store
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedUser = jwt_decode(localStorage.jwtToken);
  const preloadedState = { api: { isAuthenticated: true } };
  console.log("Decoded", decodedUser)
  store = configureStore(preloadedState);
  const currentTime = Date.now() / 1000;
  preAuth().then(data => localStorage.setItem("username", data.data.username)).catch(err=> console.log(err))
  if (decodedUser.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/login';
  }
}else {
  store = configureStore({});
}
const root = document.getElementById('root');
ReactDOM.render(<Root store={store} />, root);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
