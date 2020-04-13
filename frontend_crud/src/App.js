import React from 'react';

import Index from './components/index';
import Create from './components/create';
import Update from './components/update';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Index}/>
        <Route path="/create" component={Create}/>
        <Route path="/update/:id" component={Update}/>
      </Router>
    </div>
  );
}

export default App;
