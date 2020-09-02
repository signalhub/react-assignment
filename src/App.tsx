import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.scss';
import Trades from "./containers/Trades/Trades";
import Navbar from "./components/Navigation/Navbar/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path={'/trades'} exact component={Trades} />
        <Route path={'/trades/:tradeId'} component={Trades} />
        <Redirect from='**' to='/trades' />
      </Switch>
    </>
  );
}

export default App;
