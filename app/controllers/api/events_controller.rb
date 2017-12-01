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
        @event = Event.new(event_params.except(:tickets_attributes, :category_names))  
        @event_errors = []
        @ticket_errors = []
        @category_errors = []
        begin
            Event.transaction do
                @event_errors = @event.errors.full_messages unless @event.valid?
                @event.save!
                @event.tickets = tickets_params.to_h.values.map do |ticket|
                    ticket = Ticket.new(ticket)
                    @ticket_errors << ticket.errors.full_messages unless ticket.valid?
                    ticket
                end
                @event.categories = params[:event][:category_names].map do |category_name|
                    category = Category.new(name: category_name)
                    @category_errors << category.errors.full_messages unless category.valid?
                    category
                end
            end  
            if Event.find(@event.id)
                render "api/events/show"
            end
        rescue ActiveRecord::ActiveRecordError
            @ticket_errors.each_with_index do |errors, index|
                @ticket_errors[index] = errors.select{|err|err.downcase.include? "name"}
            end
            if @category_errors.any?{|err|err[0].downcase.include? "name"}
                @category_errors = ["You must choose at least one category."]
            elsif (params[:event][:category_names][0] == params[:event][:category_names][1])
                @category_errors = ["Each category must be unique."]
            end
            render json: [@event_errors, @ticket_errors , @category_errors], status: 422
        end
    end

    def update
        @event = Event.find(params[:event][:id])
        if @event.update_attributes(single_event_params)
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
            address: [],
            category_names: [],
            tickets_attributes: [:id, :name, :price, :quantity, :event_id, :_destroy]
        )
    end

    def single_event_params
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
            address: [],
        )
    end

end
