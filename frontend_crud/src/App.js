import React from 'react';

import Home from './components/Menu/Home';
import Create from './components/Menu/Create';
import Update from './components/Menu/Update';
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
