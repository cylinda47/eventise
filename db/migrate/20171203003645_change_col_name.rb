class ChangeColName < ActiveRecord::Migration[5.1]
  def change
    rename_column :events, :address, :addresses
    rename_column :events, :category, :categories
  end
end
