json.extract! event, :id,
            :title,
            :description,
            :address,
            :start_date,
            :end_date,
            :organizer_id,
            :organizer
json.image_url asset_path(event.image.url)