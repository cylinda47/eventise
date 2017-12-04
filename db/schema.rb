# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171203003645) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookmarks", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_bookmarks_on_event_id"
    t.index ["user_id", "event_id"], name: "index_bookmarks_on_user_id_and_event_id", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.integer "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_categories_on_event_id"
    t.index ["name", "event_id"], name: "index_categories_on_name_and_event_id", unique: true
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.string "addresses", default: [], array: true
    t.float "lat"
    t.float "lng"
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.integer "organizer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "organizer", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.boolean "is_online_event", default: false
    t.time "start_time"
    t.time "end_time"
    t.string "categories", default: [], array: true
    t.index ["end_date"], name: "index_events_on_end_date"
    t.index ["organizer_id"], name: "index_events_on_organizer_id"
    t.index ["start_date"], name: "index_events_on_start_date"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "purchaser_id", null: false
    t.integer "ticket_id", null: false
    t.integer "quantity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tickets", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.decimal "price", precision: 8, scale: 2
    t.integer "quantity"
    t.integer "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_tickets_on_event_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "firstname", null: false
    t.string "lastname", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
