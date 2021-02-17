import React from 'react';
import NavBar from '@cpnt/NavBar';
import Home from '@views/Home';

import './App.css';
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Home></Home>
    </div>
  );
}

export default App;
