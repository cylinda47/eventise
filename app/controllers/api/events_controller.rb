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
        @ticket_errors = {}
        begin
            Event.transaction do
                @event.save!
                @event.tickets = tickets_params.to_h.values.map.with_index do |ticket, idx|
                    ticket = Ticket.new(ticket)
                    # if !ticket.valid?
                    #     @ticket_errors[idx] = ticket.errors.full_messages
                    # end
                end
            end  
            if Event.find(@event.id)
                render "api/events/show"
            end
        rescue ActiveRecord::ActiveRecordError => errors
  
            if errors.message.index('ticket') || tickets_params.length < 1
                render json: ["Invalid Ticket params"], status: 422
            else
                render json: [errors.message], status: 422
            end
        end
    end

    def update
        @event = Event.find(params[:event][:id])
        if @event.update_attributes(event_params)
            render "api/events/show"
        else
            render json: @event.errors.full_messages, status: 422
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

    def render_error
        render json: @event.errors.full_messages, status: 422
    end

    def event_params
        params.require(:event).permit(
            :id,
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
            address: [],
            tickets_attributes: [:id, :name, :price, :quantity, :event_id, :_destroy]
        )
    end

end
