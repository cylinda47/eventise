export const fetchCategoryEvents = name => (
    $.ajax({
        method: 'GET',
        url: `/api/categories/${name}`,
        data: name
    })
);