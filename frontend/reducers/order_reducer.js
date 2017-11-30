import { RECEIVE_ORDER } from '../actions/ticket_actions';
import merge from 'lodash/merge';

export const orderReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ORDER:
            let newState = merge({}, state);
            newState[action.order.id] = action.order;
            return newState;
        default:
            return state;
    }
};