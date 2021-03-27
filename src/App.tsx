import React, { useEffect } from 'react';
import NavBar from '@cpnt/NavBar';
import Home from '@views/Home';
import Detail from '@views/Detail';
import Cast from '@views/Cast';

import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route
} from 'react-router-dom';

import { getCurrLocation } from '@network/common';

import './App.css';
import './styles/index.scss';

const initLocation = async () => {
  const cityName = await (await getCurrLocation()).address.split('|')[2];
  localStorage.setItem('cityName', cityName);
};

function App() {
  useEffect(() => {
    initLocation();
  }, []);

  return (
    <div className="App">
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

      <HashRouter>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/cast/:id" component={Cast} />
          </Switch>
        </Router>
      </HashRouter>
    </div>
  );
}

export default App;
