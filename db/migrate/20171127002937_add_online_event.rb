class AddOnlineEvent < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :is_online_event, :boolean, default: false
    remove_column :events, :image_url, :string
  end
end
