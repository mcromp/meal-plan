
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Day from '../Day';
import Header from '../Header/Header';
import Login from '../Login';
import PrintableWeek from '../PrintableWeek';


const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/w">
          <>
            <Header />
            <PrintableWeek />
          </>
        </Route>
        <Route path="/d/:day">
          <>
            <Header />
            <Day />
          </>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

const NotFound: React.FC = () => {
  return (
    <div>
      404
    </div>
  )
}

export default App