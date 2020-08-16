import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import History from './components/History';
import Tambola from './components/Tambola';
import Homepage from './components/Homepage';
import Register from './components/Register';

import './styles/App.css';
import GuestTambola from './components/GuestTambola';
import NavigationBar from './components/NavigationBar';
import Store from './AppReducer';

function App() {
  console.log('process.env', process.env);

  return (
    <div>
      <Store>
        <Router history={History}>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admin/:gameNumber" component={Tambola} />
            <Route path="/:id" component={GuestTambola} />
          </Switch>
        </Router>
      </Store>
    </div>
  );
}

export default App;
