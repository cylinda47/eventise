import * as SessionAPIUtil from '../util/session_api_util';
import * as UserAPIUtil from '../util/user_api_util';
import * as BookmarkAPIUtil from '../util/bookmark_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

export const login = user => dispatch => (
    SessionAPIUtil.login(user)
        .then(currentUser => dispatch(receiveCurrentUser(currentUser)),
        errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
    SessionAPIUtil.logout()
        .then(() => dispatch(receiveCurrentUser(null)))
);

export const signup = user => dispatch => (
    UserAPIUtil.signup(user)
        .then(currentUser => dispatch(receiveCurrentUser(currentUser)),
        errors => dispatch(receiveUserErrors(errors.responseJSON)))
);

export const updateUser = user => dispatch => (
    UserAPIUtil.updateUser(user)
        .then(user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveUserErrors(errors.responseJSON)))
);

export const addBookmark = bookmark => dispatch => (
    BookmarkAPIUtil.addBookmark(bookmark)
        .then(user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveUserErrors(errors.responseJSON)))
)

export const removeBookmark = eventId => dispatch => (
    BookmarkAPIUtil.removeBookmark(eventId)
        .then(user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveUserErrors(errors.responseJSON)))
)

