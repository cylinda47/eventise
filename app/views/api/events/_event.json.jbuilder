json.extract! event, :id,
            :title,
            :description,
            :address,
            :start_date,
            :end_date,
            :start_time,
            :end_time,
            :organizer_id,
            :organizer,
            :is_online_event
json.image_url asset_path(event.image.url(:original))

arr = event.categories.pluck(:name)
if arr.length == 1
    arr.push("")
end
json.category_names arr