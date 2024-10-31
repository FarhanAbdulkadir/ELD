import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DrivingLogForm from '../DrivingLogForm/DrivingLogForm';
import VehicleInspectionForm from '../VehicleInspectionForm/VehicleInspectionForm';
import LoadInformation from '../LoadInformation/LoadInformation';

function DriverDashboard() {
  return (
    <Router>
      <div>
        <h1>Driver Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/driver-info">Driver Information</Link></li>
            <li><Link to="/vehicle-inspection">Vehicle Inspection</Link></li>
            <li><Link to="/load-information">Load Information</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/driver-info" component={DrivingLogForm} />
          <Route path="/vehicle-inspection" component={VehicleInspectionForm} />
          <Route path="/load-information" component={LoadInformation} />
          <Route path="/" exact>
            <h2>Welcome to the Driver Dashboard</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default DriverDashboard;
