export const fetchEvents = () => (
    $.ajax({
        method: 'GET',
        url: `api/events`
    })
);

export const fetchEvent = eventId => (
    $.ajax({
        method: 'GET',
        url: `api/events/${eventId}`
    })
);

export const createEvent = formData => (
    $.ajax({
        method: 'POST',
        url: `/api/events`,
        data_type: "json",
        processData: false,
        contentType: false,
        data: formData
    })
);

export const updateEvent = event => (
    $.ajax({
        method: 'PATCH',
        url: `/api/events/${event.id}`,
        processData: false,
        contentType: false,
        data: event
    })
);

export const deleteEvent = eventId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/events/${eventId}`
    })
);

export const createTicket = ticket => (
    $.ajax({
        method: 'POST',
        url: `/api/tickets`,
        data: ticket
    })
)

export const updateCategory = (eventId, category) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/categories/${eventId}`,
        data: category
    })
);