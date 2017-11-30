json.extract! ticket, :id, :name, :description, :price, :quantity

total = 0;
ticket.orders.each do |order|
    total += order.quantity
end

json.remaining_qty (ticket.quantity-total)