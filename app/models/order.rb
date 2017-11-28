class Order < ApplicationRecord
    validates :purchaser_id, :ticket_id, :quantity, presence: true

    has_one :event,
        through: :ticket,
        source: :event

    belongs_to :ticket

    belongs_to :purchaser,
        primary_key: :id,
        foreign_key: :purchaser_id,
        class_name: :User

end
