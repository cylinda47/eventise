class CreateTickets < ActiveRecord::Migration[5.1]
  def change
    create_table :tickets do |t|
      t.string :name, null: false
      t.string :description
      t.decimal :price, precision: 8, scale: 2
      t.integer :quantity
      t.integer :event_id, null: false
      t.timestamps
    end
    add_index :tickets, :event_id
  end
end
