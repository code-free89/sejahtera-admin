import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Auth from 'pages/Auth';
import Dashboard from 'pages/Dashboard';
import { AuthProvider } from 'providers/AuthProvider';
import { ToastContainer } from 'react-toast';
import DigitalCertificate from 'pages/Dashboard/DigitalCertificate';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/digital-certificate/:userId/:vaccineId" component={DigitalCertificate} />
          <Route path="/auth" component={Auth} />
          <PrivateRoute path="/" component={Dashboard} />
          <Redirect to="/auth" from="/" />
        </Switch>
      </BrowserRouter>
      <ToastContainer delay={3000} position="top-right" />
    </AuthProvider>
  );
}

export default App;
