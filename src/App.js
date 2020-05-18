import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import History from './components/History';
import Tambola from './components/Tambola';
import Homepage from './components/Homepage';

import './styles/App.css';
import GuestTambola from './components/GuestTambola';

function App() {
  return (
    <div>
      <Router history={History}>
        <Route exact path="/" component={Homepage} />
        <Switch>
          <Route exact path="/gameon/:gameNumber" component={Tambola} />
          <Route path="/:id" component={GuestTambola} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
