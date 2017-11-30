class Api::OrdersController < ApplicationController
    def create
        @order = Order.new(order_params)
        # debugger
        if @order.save
            render "api/orders/show"
        else
            render json: @order.errors.full_messages, status: 422
        end
    end

    private

    def order_params
        params.require(:order).permit(:purchaser_id, :ticket_id, :quantity)
    end
end
