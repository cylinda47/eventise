import { RECEIVE_SESSION_ERRORS, RECEIVE_USER_ERRORS } from "../actions/session_actions";
import { RECEIVE_EVENT_ERRORS } from "../actions/event_actions";

import merge from 'lodash/merge';

const _emptyState = {
    loginForm: [],
    userForm: [],
    eventForm: []
};

export const errorsReducer = (state = _emptyState, action) => {
    Object.freeze(state)
    let newState = merge({}, _emptyState);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            newState.loginForm = action.errors;
            return newState;
        case RECEIVE_USER_ERRORS:
            newState.userForm = action.errors;
            return newState;
        case RECEIVE_EVENT_ERRORS:
            newState.eventForm = action.errors;
            return newState;
        default:
            return state;
    }
};