class Api::EventsController < ApplicationController

    def index
        @events = Event.all
        render "api/events/index"
    end

    def show
        @event = Event.find(params[:id])
        render "api/events/show"
    end

    def create
        tickets_params = event_params.delete(:tickets_attributes)
        @event = Event.new(event_params.except(:tickets_attributes))  
        @event_errors = []
        @ticket_errors = Ticket.valid_tickets?(tickets_params)
        begin
            Event.transaction do
                @event_errors = @event.errors.full_messages unless @event.valid?
                @event.save!
                @event.tickets = tickets_params.to_h.values.map { |ticket| Ticket.new(ticket) }
                render "api/events/show"
            end
        rescue ActiveRecord::ActiveRecordError, NoMethodError
            render json: [@event_errors, @ticket_errors], status: 422
        end
    end

    def update
        @event = Event.find(params[:event][:id])
        if @event.update_attributes(event_params.except(:tickets_attributes))
            render "api/events/show"
        else
            render json: [@event.errors.full_messages, [], []], status: 422
        end
    end

    def destroy
        @event = Event.find(params[:id])
        if @event.destroy
            render "api/events/show"
        else
            render json: @event.errors.full_messages, status: 422
        end
    end

    private

    def event_params
        params.require(:event).permit(
            :title,
            :description,
            :is_online_event,
            :image,
            :start_date,
            :end_date,
            :start_time,
            :end_time,
            :organizer_id,
            :organizer,
            addresses: [],
            categories: [],
            tickets_attributes: [:id, :name, :price, :quantity, :event_id, :_destroy]
        )
    end

end
