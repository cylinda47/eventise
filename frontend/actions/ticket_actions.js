import * as TicketAPIUtil from '../util/ticket_api_util';

export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const RECEIVE_ORDER_ERRORS = "RECEIVE_ORDER_ERRORS";

const receiveOrder = order => ({
    type: RECEIVE_ORDER,
    order
});

const receiveOrderErrors = errors => ({
    type: RECEIVE_ORDER_ERRORS,
    errors
});

export const createOrder = order => dispatch => (
    TicketAPIUtil.createOrder(order)
        .then(order => dispatch(receiveOrder(order)),
        errors => dispatch(receiveOrderErrors(errors.responseJSON)))
);