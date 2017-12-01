class Api::CategoriesController < ApplicationController
    
    def show
        @categories = Category.where(name: params[:id])
        @events = Event.where(id: @categories.pluck(:event_id))
        render "api/events/index"
    end

    def update
        @event = Event.find_by(id: params[:id])
        @category_errors = [];
        Category.transaction do
            @event.categories.destroy_all
            @event.categories = params[:category].map do |name|
                category = Category.new(name: name, event_id: @event.id)
                @category_errors << category.errors.full_messages unless category.valid?
                category
            end
        end
        if @category_errors.length < 1
            render "api/events/show"
        else
            render json: [[], [], @category_errors], status: 422
        end
    end

    private

    def category_params
        params.require(:category).permit(:name, :event_id)
    end

end
