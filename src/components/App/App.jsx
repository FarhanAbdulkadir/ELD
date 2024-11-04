import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import DriverDashboard from '../DriverDashboard/DriverDashboard';
import DispatcherDashboard from '../DispatcherDashboard/DispatcherDashboard';
import DrivingLogForm from '../DrivingLogForm/DrivingLogForm';
import VehicleInspectionForm from '../VehicleInspectionForm/VehicleInspectionForm';
import LoadInformation from '../LoadInformation/LoadInformation';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log("user role is", typeof user.Roles);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
    <div>
      <Nav />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <ProtectedRoute exact path="/user" component={UserPage} />
        <ProtectedRoute exact path="/info" component={InfoPage} />
        <ProtectedRoute path="/driver-dashboard" component={DriverDashboard} />
        <ProtectedRoute path="/dispatcher-dashboard" component={DispatcherDashboard} />

        {/* <Route path="/driver-dashboard/driver-info" component={DrivingLogForm} />
          <Route path="/driver-dashboard/vehicle-inspection" component={VehicleInspectionForm} />
          <Route path="/driver-dashboard/load-information" component={LoadInformation} /> */}
         

      
          {/* <Route path="/loads">
            <LoadList loads={loads} onDelete={deleteLoad} onUpdate={updateLoad} />
            <LoadForm onAdd={addLoad} />
          </Route> */}
          
        
       
        
      <Route exact path="/login"> 
      
        {user.id && user.Roles !== undefined ? (
        // Redirect based on user role only when loading is complete
        
      <Redirect to={user.Roles === "0" ? "/driver-dashboard" : "/dispatcher-dashboard"} />
       ) : (
      <LoginPage />
       )}
      </Route>

        <Route exact path="/registration">
          {user.id ? <Redirect to="/user" /> : <RegisterPage />}
        </Route>
        <Route exact path="/home">
          {user.id ? <Redirect to="/user" /> : <LandingPage />}
        </Route>
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
      {!user.id && <Footer />}
    </div>
  </Router>
  )}  

export default App;
