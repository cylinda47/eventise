class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.integer :purchaser_id, null: false
      t.integer :ticket_id, null: false
      t.integer :event_id, null: false
      t.integer :quantity, null: false
      t.timestamps
    end
  end
end
