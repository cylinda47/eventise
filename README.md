# Eventise

[Eventise Live](https://eventise.herokuapp.com/)

Eventise is a full-stack web application based on Eventbrite. It is created with Ruby on Rails backend, PostgreSQL database, and React.js/Flux architecture frontend.

![](http://s3-us-west-1.amazonaws.com/eventise-dev/events/images/000/000/207/original/%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96_2017-12-01_14.28.43.png)

# Features & Implementation

## Event Creation / Update
 
Eventise allows a user to create new events, which can either be a conventional event or an online event without a physical location. In order to maximize a user’s flexibility in revenue management and marketing strategy, Eventise allows the user to create different categories of tickets for the same event, each with a specific quantity and price.

### Event Details
* Allow users to upload image from local machine
* Allow rich text editing for event's description

![](http://g.recordit.co/DFzUsxlpk1.gif)

### Multiple Ticket Option
* Allow adding/removing ticket options

![](http://g.recordit.co/ps3ok8WM5p.gif)

### Code: `transaction`
Since the form holds all information (event, ticket, category) which has its own table in the database and model in the backend, a `transaction` block is used to ensure that entries will only be created when they are all validated. Otherwise, a rollback will be triggered.

```javascript
Event.transaction do
   @event.save!
   @event.tickets = tickets_params.to_h.values.map do |ticket|
      ticket = Ticket.new(ticket)
   ...
```
The implementation of _nested attributes_

```javascript
   params.require(:event).permit(
      tickets_attributes: [:id, :name, :price, :quantity, :event_id, :_destroy]
   ...
```

## Ticket Registration

On event's detail show page, there is button linked to a pop-up ticket purchasing process, which displays a list of tickets and their remaining quantity. It also involves checks on the total price and quantity. A checkout summary and order confirmation will be displayed / redirected when action is triggered.

![](http://g.recordit.co/v5mNPmRFXQ.gif)

## User Authentication

When user click login from navigation bar, a modal containing the signup/login form pops up. It is a togglable form which keeps track of user's input when on a different form.

![](http://g.recordit.co/WIc1PqyP74.gif)

### Library: `react-modal `

## Event Display & Categories

When hovering over Browse Events button, user is prompted to select from one of the pre-defined categories of events, and redirected to a page containing all events which contains the selected category tag.

![](http://s3-us-west-1.amazonaws.com/eventise-dev/events/images/000/000/047/original/%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96_2017-12-01_14.41.34.png)

# Future Expansion
 
### Google map API
An existing feature on Eventbrite. User should be able to narrow the range of search results by navigating the google map object on the page, or click on the marked location to view the individual event.
### Event sharing
An existing feature on Eventbrite. User should be able to share the event by email or on other social media.
### Search/sort events based on venue and distance
A feature currently not available on Eventbrite. Uer may commence a search for events with a specific venue in mind. Alternatively, if user enters her current address, events may be sorted beginning with those closest to the user.
### Browse events based on category, event type, date and price
An existing feature on Eventbrite.
### Event recommendation based on events selected by the user / past events
An existing feature on Eventbrite.
### User interaction
An existing feature on Eventbrite. User should be able to contact the event organiser.
### Add to calendar
An existing feature on Eventbrite.
### Digital ticket management
In some situations a user may end up not being able to attend an event. There should be a function to allow user to sell her ticket to another user registered on Eventise.
### Provide data analytics to event organizer
An event organizer should have access to real time data regarding the tickets sold and information of the attendants such as age group distribution, gender distribution etc.
