export const addBookmark = bookmark => (
    $.ajax({
        method: 'POST',
        url: '/api/bookmarks',
        data: { bookmark }
    })
);

export const removeBookmark = eventId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/bookmarks/${eventId}`
    })
);