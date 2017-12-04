class Api::OrdersController < ApplicationController

    def index
        @orders = current_user.orders.uniq
        render "api/orders/index"
    end

    def create
        @order = Order.new(order_params)
        if @order.save
            render "api/orders/show"
        else
            render json: @order.errors.full_messages, status: 422
        end
    end

    private

    def order_params
        params.require(:order).permit(:id, :purchaser_id, :ticket_id, :quantity)
    end
end
