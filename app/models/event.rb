class Event < ApplicationRecord
    validates :description, :start_date, :end_date, :organizer, :organizer_id, presence: true
    validates :address, length: { maximum: 4 }
    validates :title, presence: true, length: { maximum: 60 }

    has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "event.jpg"
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

    validate :end_date_after_start_date?

    has_many :categories
    
    belongs_to :creator,
    primary_key: :id,
    foreign_key: :organizer_id,
    class_name: :User
    
    has_many :tickets,
    primary_key: :id,
    foreign_key: :event_id,
    class_name: :Ticket
    
    accepts_nested_attributes_for :tickets
    
    has_many :orders,
        through: :tickets,
        source: :orders

    def end_date_after_start_date?
        if end_date && start_date
            if end_date < start_date
                errors.add :end_date, "must be after start date"
            end
        end
        if start_date && start_date < Time.now
            errors.add :start_date, 'must be in the future'
        end
        if end_date && end_date < Time.now
            errors.add :end_date, 'must be in the future'
        end
    end
    
end
