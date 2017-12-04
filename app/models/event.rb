class Event < ApplicationRecord
    validates :description, :start_date, :end_date, :organizer, :organizer_id, presence: true
    validates :title, presence: true, length: { maximum: 60 }

    has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "event.jpg"
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

    validate :end_date_after_start_date?
    validate :address_is_not_nil
    validate :validates_category

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

    def address_is_not_nil
        if !is_online_event
            result = addresses.select { |address| address.length > 1 }
            errors.add :address, "can't be blank" unless result.length > 0
        end
    end

    def validates_category
        result = categories.select { |category| category.length > 1 }
        return errors.add :categories, "can't be empty" unless result.length > 0
        if categories[0] == categories[1]
            errors.add :categories, "must be unique"
        end
    end
    
end
