class DropEventIdCol < ActiveRecord::Migration[5.1]
  def change
    remove_column :orders, :event_id, :integer
  end
end
