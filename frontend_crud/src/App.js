import React from 'react';

import Home from './components/Home';
import Create from './components/Create';
import Update from './components/Update';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/create" component={Create}/>
        <Route path="/update/:id" component={Update}/>
      </Router>
    </div>
  );
}

export default App;
