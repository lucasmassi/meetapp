import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MeetupDetail from '../pages/Meetup/Detail';
import MeetupNew from '../pages/Meetup/New';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />

      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />
      <Route path="/meetup/:id" exact component={MeetupDetail} isPrivate />
      <Route path="/meetup" exact component={MeetupNew} isPrivate />

      <Route path="/" component={Register} />
    </Switch>
  );
}
