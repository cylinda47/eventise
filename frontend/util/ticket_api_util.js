export const createOrder = order => (
    $.ajax({
        method: 'POST',
        url: `/api/orders`,
        data_type: "json",
        data: { order }
    })
)

export const fetchOrders = () => (
    $.ajax({
        method: 'GET',
        url: `/api/orders`
    })
)