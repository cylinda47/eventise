class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.integer :event_id, null: false
      t.timestamps
    end
    add_index :categories, [:name, :event_id], unique: true
    add_index :categories, :event_id
  end
end
