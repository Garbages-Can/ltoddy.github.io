import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeApp from './home/App';
import BlogApp from './blog/App';
import PageNotFound from './404';


const createRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={HomeApp}/>
      <Route exact path='/blog' component={BlogApp}/>
      <Route component={PageNotFound}/>
    </Switch>
  </Router>
);

export default createRouter;
