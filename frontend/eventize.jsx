import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import configureStore from './store/store';
import Root from './components/root';

import { login, logout, signup, updateUser } from './actions/session_actions';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from './actions/event_actions';

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

    window.fetchEvents = fetchEvents;
    window.createEvent = createEvent;
    window.updateEvent = updateEvent;
    window.deleteEvent = deleteEvent;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
});
