import { combineReducers } from 'redux';
import { eventReducer } from './event_reducer';
import { orderReducer } from './order_reducer';

export const entitiesReducer = combineReducers({
    events: eventReducer,
    orders: orderReducer
});