import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullState = {
    currentUser: null
};

export const sessionReducer = (state = _nullState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, { currentUser: action.user });
        default:
            return state;
    }
};