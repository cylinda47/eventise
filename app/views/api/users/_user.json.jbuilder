json.extract! user, :id, :email, :firstname, :lastname

json.bookmarked_event_ids user.bookmarks.pluck(:event_id)