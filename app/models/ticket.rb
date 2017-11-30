class Ticket < ApplicationRecord
    validates :name, :event_id, presence: true
    validates :price, presence: true, format: { with: /\A\d+(?:\.\d{0,2})?\z/ }, numericality: { greater_than: 0, less_than: 1000000 }

    belongs_to :event,
        primary_key: :id,
        foreign_key: :event_id,
        class_name: :Event

    has_many :orders
    
end
