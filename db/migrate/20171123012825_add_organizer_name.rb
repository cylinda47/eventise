class AddOrganizerName < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :organizer, :string, null: false
  end
end
