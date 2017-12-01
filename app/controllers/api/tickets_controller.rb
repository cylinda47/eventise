class Api::TicketsController < ApplicationController
    def create
        @ticket = Ticket.new(ticket_params)
        @ticket.event_id = params[:event_id]
        if @ticket.save
            @event = @ticket.event
            render "api/events/show"
        else
            render json: [[], @ticket.errors.full_messages, []], status: 422
        end
    end

    def ticket_params
        params.require(:ticket).permit(:name, :price, :quantity)
    end
end
