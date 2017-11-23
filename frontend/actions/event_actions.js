import * as EventAPIUtil from '../util/event_api_util';

export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";

const receiveEvent = event => ({
    type: RECEIVE_EVENT,
    event
});

const receiveEvents = events => ({
    type: RECEIVE_EVENTS,
    events
});

const receiveEventErrors = errors => ({
    type: RECEIVE_EVENT_ERRORS,
    errors
});

export const fetchEvents = () => dispatch => (
    EventAPIUtil.fetchEvents()
        .then(events => dispatch(receiveEvents(events)),
        errors => dispatch(receiveEventErrors(errors)))
);

export const createEvent = event => dispatch => (
    EventAPIUtil.createEvent(event)
        .then(event => dispatch(receiveEvent(event)),
        errors => dispatch(receiveEventErrors(errors)))
);

export const updateEvent = event => dispatch => (
    EventAPIUtil.updateEvent(event)
        .then(event => dispatch(receiveEvent(event)),
        errors => dispatch(receiveEventErrors(errors)))
);

export const deleteEvent = eventId => dispatch => (
    EventAPIUtil.deleteEvent(eventId)
        .then((errors) => dispatch(receiveEventErrors(errors)))
);