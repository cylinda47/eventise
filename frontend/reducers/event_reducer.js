import { RECEIVE_EVENT, RECEIVE_EVENTS } from '../actions/event_actions';
import merge from 'lodash/merge';

export const eventReducer = (state = {} , action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_EVENTS:
            return merge({}, state, action.events);
        case RECEIVE_EVENT:
            let newState = merge({}, state);
            newState[action.event.id] = action.event;
            return newState;
        default:
            return state;
    }
};