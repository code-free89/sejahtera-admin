import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Home from './Main';
import Users from './Users';
import Vaccines from './Vaccines';
import News from './News';
import StatisticsPage from './Statistics';
import DigitalCertificate from './DigitalCertificate';

export default function Dashboard() {
  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-100">
      <Sidebar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/vaccines" component={Vaccines} />
        <Route exact path="/news" component={News} />
        <Route exact path="/statistics" component={StatisticsPage} />
        <Route exact path="/digital-certificate/:userId/:vaccineId" component={DigitalCertificate} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}
