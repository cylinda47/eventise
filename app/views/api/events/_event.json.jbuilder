json.extract! event, :id,
            :title,
            :description,
            :addresses,
            :start_date,
            :end_date,
            :start_time,
            :end_time,
            :organizer_id,
            :organizer,
            :is_online_event,
            :categories
json.image_url asset_path(event.image.url(:original))

