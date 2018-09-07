import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';


const createRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={App}/>
    </Switch>
  </Router>
);

export default createRouter;
