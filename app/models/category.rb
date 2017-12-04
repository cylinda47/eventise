class Category < ApplicationRecord

    CATEGORIES = %w(music food_drink classes arts parties sports_wellness networking).freeze

    validates :name, inclusion: CATEGORIES
    validates :name, :event_id, presence: true
    
end
