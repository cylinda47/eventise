import * as EventAPIUtil from '../util/event_api_util';
import * as CategoryAPIUtil from '../util/category_api_util';

export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
export const RECEIVE_CATEGORY_EVENTS = "RECEIVE_CATEGORY_EVENTS";

const receiveEvent = event => ({
    type: RECEIVE_EVENT,
    event
});

const receiveEvents = events => ({
    type: RECEIVE_EVENTS,
    events
});

const receiveCategoryEvents = events => ({
    type: RECEIVE_CATEGORY_EVENTS,
    events
})

const receiveEventErrors = errors => ({
    type: RECEIVE_EVENT_ERRORS,
    errors
});

export const fetchEvents = () => dispatch => (
    EventAPIUtil.fetchEvents()
        .then(events => dispatch(receiveEvents(events)),
        errors => dispatch(receiveEventErrors(errors.responseJSON)))
);

export const fetchEvent = eventId => dispatch => (
    EventAPIUtil.fetchEvent(eventId)
        .then(event => dispatch(receiveEvent(event)),
        errors => dispatch(receiveEventErrors(errors.responseJSON)))
);

export const createEvent = event => dispatch => (
    EventAPIUtil.createEvent(event)
        .then(event => dispatch(receiveEvent(event)),
        errors => dispatch(receiveEventErrors(errors.responseJSON)))
);

export const updateEvent = event => dispatch => (
    EventAPIUtil.updateEvent(event)
        .then(event => dispatch(receiveEvent(event)),
        errors => dispatch(receiveEventErrors(errors.responseJSON)))
);

export const deleteEvent = eventId => dispatch => (
    EventAPIUtil.deleteEvent(eventId)
        .then((errors) => dispatch(receiveEventErrors(errors.responseJSON)))
);

export const fetchCategoryEvents = name => dispatch => (
    CategoryAPIUtil.fetchCategoryEvents(name)
        .then(events => dispatch(receiveCategoryEvents(events)),
        errors => dispatch(receiveEventErrors(errors.responseJSON)))
)

export const createTicket = ticket => dispatch => (
    EventAPIUtil.createTicket(ticket)
        .then(event => dispatch(receiveEvent(event)),
        errors => dispatch(receiveEventErrors(errors.responseJSON)))
);

export const updateCategory = (eventId, category) => dispatch => (
    EventAPIUtil.updateCategory(eventId, category)
        .then(event => dispatch(receiveEvent(event)),
        errors => dispatch(receiveEventErrors(errors.responseJSON)))
);