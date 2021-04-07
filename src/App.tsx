import React from 'react';
import './App.css';
import Screen from './components/Screen';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { About } from './views/About';
import { Dashboard } from './views/Dashboard';

function App() {
  // return <Screen />;

  return (
    <Router>
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/game'>
          <Screen />
        </Route>
        <Route path='/'>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
