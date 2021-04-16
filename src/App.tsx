import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routes from './views/Router/routes';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            exact
            key={index}
            path={route.path}
            render={(props) => {
              const Layout = route.layout;
              const Component = route.component;
              return (
                <Layout>
                  <Component />
                </Layout>
              );
            }}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
