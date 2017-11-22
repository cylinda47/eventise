import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import configureStore from './store/store';
import Root from './components/root';

import { login, logout, signup, updateUser } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    Modal.setAppElement(document.body)
    let store;
    if (window.currentUser) {
        const preloadedState = { session: { currentUser: window.currentUser } }
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);

    window.login = login;
    window.logout = logout;
    window.signup = signup;
    window.updateUser = updateUser;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
});
