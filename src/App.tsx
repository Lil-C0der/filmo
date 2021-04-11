import React, { useEffect } from 'react';
import NavBar from '@cpnt/NavBar';
// import Home from '@views/Home';
// import Detail from '@views/Detail';
// import Cast from '@views/Cast';
// import Profile from './views/Profile';
// import Login from './views/Login';
import routes from '@route/index';

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
      <HashRouter getUserConfirmation={(msg, cb) => {}}>
        <Router>
          <NavBar />
          <Switch>
            {/* <Route path="/" exact component={Home} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/cast/:id" component={Cast} />
            <Route path="/login" component={Login} />
            <Route path="/usr" component={Profile} /> */}

            {routes.map(({ path, component, exact, name }) => (
              <Route
                key={name}
                path={path}
                exact={exact}
                component={component}
              />
            ))}
          </Switch>
        </Router>
      </HashRouter>
    </div>
  );
}

export default App;
