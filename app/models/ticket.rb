class Ticket < ApplicationRecord
    validates :name, :quantity, presence: true
    validates :price, presence: true, format: { with: /\A\d+(?:\.\d{0,2})?\z/ }, numericality: { less_than: 1000000 }

    belongs_to :event,
        primary_key: :id,
        foreign_key: :event_id,
        class_name: :Event

    has_many :orders

    def self.valid_tickets?(tickets_params)
        ticket_errors = []
        tickets_params.to_h.values.map do |ticket|
            ticket = Ticket.new(ticket)
            ticket_errors << ticket.errors.full_messages unless ticket.valid?
        end
        ticket_errors.map do |errors|
            errors
                .select { |error| !error.downcase.include? "event" }
                .map { |error| error.prepend('Ticket ') }
        end
    end

end
