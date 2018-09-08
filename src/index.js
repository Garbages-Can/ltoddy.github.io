import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './blog/App';
import PageNotFound from './404';


const createRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route component={PageNotFound}/>
    </Switch>
  </Router>
);

export default createRouter;
