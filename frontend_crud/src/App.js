import React from 'react';

import Index from './components/index';
import Create from './components/create';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Index/><br/>
        <Create/>
      </header>
    </div>
  );
}

export default App;
