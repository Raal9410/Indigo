import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'
import NotFound from './components/404/NotFound.js'
import SpotifyLib from './components/spotify/Spotify';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/spotify" component={SpotifyLib}/>
      <Route exact path="/profile/editProfile" component={EditProfile} />
<Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
