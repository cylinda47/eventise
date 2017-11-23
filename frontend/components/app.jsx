import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import EventIndexContainer from './event_index/event_index_container';
import EventFormContainer from './event_form/event_form_container';
import { Switch, Route, Redirect } from 'react-router-dom';

export const App = () => {
    return (
        <div>
            <header>
                <NavBarContainer />
            </header>
            <Switch>
                <Route exact path="/" component={EventIndexContainer} />
                <Route path="/events/new" component={EventFormContainer} />
                <Route path="/events/:eventId/edit" component={EventFormContainer} />
                <Redirect to="/" component={EventIndexContainer} />
            </Switch>
        </div>
    )
}