
import React from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import EditMenu from '../EditMenu';
import Header from '../Header/Header';
import Home from '../Home';
import ErrorPage from '../ErrorPage';
import PrintableWeek from '../Week/WeekPrintable';


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
            <EditMenu />
          </>
        </Route>
        <Route>
          <ErrorPage
            text={"404: Not found"}
            subText={"Redirecting to homepage..."}
            isRedirected={true} />
        </Route>
      </Switch>
    </Router>
  )
}



export default Routes