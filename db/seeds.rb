# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Event.destroy_all

# user1 = User.create(email: 'guest@eventize.io', password: 'password', firstname: 'Guest', lastname: 'Welcome')

# event1 = Event.create(title: 'First Event', description: 'Just a test', address: '[SF]', image_url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F25825148%2F183327965130%2F1%2Foriginal.jpg?w=800&rect=0%2C0%2C1688%2C844&s=ea83183ff42e915f4f847742301d218b', start_date: '2017-12-20', end_date: '2017-12-21', organizer_id: user1.id, organizer: 'App Academy')