class AddCategoryColumn < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :category, :string, array: true, default: []
  end
end
