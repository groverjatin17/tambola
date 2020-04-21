import React from 'react';
import { Router, Route } from "react-router-dom";

import History from './components/History';
import Tambola from './components/Tambola';
import Homepage from './components/Homepage';

import './styles/App.css';

function App() {
  return (
    <div>
      <Router history={History} >
        <Route exact path='/' component={Homepage} />
        <Route path='/gameon' component={Tambola} />
      </Router>
    </div>
  );
}

export default App;
