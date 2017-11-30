class Bookmark < ApplicationRecord
    validates :event_id, :user_id, presence: true

    belongs_to :event
    belongs_to :user
end
