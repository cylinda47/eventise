import { combineReducers } from 'redux';
import { eventReducer } from './event_reducer';

export const entitiesReducer = combineReducers({
    events: eventReducer
});