import React from 'react';
import './App.css';
import * as api from './services/api';

function App() {
  return (
    <div className="App">
      {api.getCategories()}
    </div>
  );
}

export default App;
