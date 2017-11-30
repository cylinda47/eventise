class Api::TicketsController < ApplicationController

    def index
        @event = Event.find_by(id: params[:id])
        @tickets = @event.tickets
    end

    def create
        @ticket = Ticket.new(ticket_params)
        if @ticket.save
            @event = @ticket.event
            render "api/tickets/show"
        else
            render json: @ticket.errors.full_messages, status: 422
            @tickets = Ticket.find_by(event_id: @ticket.event_id)
            if @tickets
                if @tickets.destroy!
                else
                    render json: @ticket.errors.full_messages, status: 422
                end
            end
            @event = Event.find(@ticket.event_id)
            if @event.destroy!
                else
                    render json: @event.errors.full_messages, status: 422
                end
            end
        end
    end

    ##### need to update ######

    def update
        @ticket = Ticket.find(params[:ticket][:id])
        if @ticket.update_attributes(ticket_params)
            render "api/tickets/show"
        else
            render json: @ticket.errors.full_messages, status: 422
        end
    end

    def ticket_params
        params.require(:ticket).permit(
            :name,
            :description,
            :price,
            :quantity,
            :event_id
        )
    end
end
