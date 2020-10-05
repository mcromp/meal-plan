
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Day from '../Day';
import Login from '../Login';
import Week from '../Week';


const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/week">
          <Week />
        </Route>
        <Route path="/d/:day">
          <Day />
        </Route>
      </Switch>
    </Router>
  )
}

export default App