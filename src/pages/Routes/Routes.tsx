
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Day from '../Day';
import Header from '../Header/Header';
import Home from '../Home';
import NotFound404 from '../NotFound404';
import PrintableWeek from '../PrintableWeek';


const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
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
        <Route component={NotFound404} />
      </Switch>
    </Router>
  )
}



export default Routes