export const signup = user => (
    $.ajax({
        method: 'POST',
        url: '/api/user',
        data: { user }
    })
);

export const updateUser = user => (
    $.ajax({
        method: 'PATCH',
        url: `/api/user`,
        data: { user }
    })
);