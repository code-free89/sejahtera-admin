import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Home from './Main';
import Users from './Users';
import Vaccines from './Vaccines';

export default function Dashboard() {
  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-100">
      <Sidebar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/vaccines" component={Vaccines} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}
