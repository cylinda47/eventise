class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :address, array: true, default: []
      t.float :lat
      t.float :lng
      t.string :image_url
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :organizer_id, null: false
      t.timestamps
    end
    add_index :events, :organizer_id
    add_index :events, :start_date
    add_index :events, :end_date
  end
end
