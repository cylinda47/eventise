class Event < ApplicationRecord
    validates :title, :description, :image_url, :start_date, :end_date, :organizer, :organizer_id, presence: true
    validates :address, length: { maximum: 4 }

    has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "event.jpg"
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

    belongs_to :creator,
        primary_key: :id,
        foreign_key: :organizer_id,
        class_name: :User
end
