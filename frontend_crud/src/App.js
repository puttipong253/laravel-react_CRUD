import React from 'react';

import Home from './components/Menu/Home';
import Create from './components/Menu/Create';
import Update from './components/Menu/Update';
import Register from './components/Menu/Register';
import Login from './components/Menu/Login';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/> 
        <Route path="/create" component={Create}/>
        <Route path="/update/:id" component={Update}/>
        <Route path="/register" component={Register}/>
      </Router>
    </div>
  );
}

export default App;
