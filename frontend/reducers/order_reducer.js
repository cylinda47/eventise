import { RECEIVE_ORDER, RECEIVE_ORDERS } from '../actions/ticket_actions';
import merge from 'lodash/merge';

export const orderReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ORDERS:
            return merge({}, state, action.orders);
        case RECEIVE_ORDER:
            let newState = merge({}, state);
            newState[action.order.order.id] = action.order.order;
            return newState;
        default:
            return state;
    }
};