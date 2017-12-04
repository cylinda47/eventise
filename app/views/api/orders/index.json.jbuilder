@orders.each do |order|
    json.set! order.id do
        json.partial! "api/orders/order", order: order
    end
end