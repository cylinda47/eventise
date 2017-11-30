json.partial! "api/events/event", event: @event

json.tickets do
    @event.tickets.each do |ticket|
        json.set! ticket.id do
            json.partial! "api/tickets/ticket", ticket: ticket
        end
    end
end