class Event < ApplicationRecord
    validates :title, :description, :image_url, :start_date, :end_date, :organizer, :organizer_id, presence: true
    validates :address, length: { maximum: 4 }

    belongs_to :creator,
        primary_key: :id,
        foreign_key: :organizer_id,
        class_name: :User
end
