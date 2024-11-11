import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DrivingLogForm from '../DrivingLogForm/DrivingLogForm';
import VehicleInspectionForm from '../VehicleInspectionForm/VehicleInspectionForm';
import DriverLoadList from '../LoadInformation/LoadInformation';
import './DriverDashboard.css';  // Import the updated CSS

function DriverDashboard() {
  return (
    <div className="dashboard-container">
      {/* Side Navigation */}
      <div className="sidenav">
        <ul>
          <li><Link className="nav-btn" to="/driver-dashboard/driver-info">
            <button className="nav-button">Driver Information</button>
          </Link></li>
          <li><Link className="nav-btn" to="/driver-dashboard/vehicle-inspection">
            <button className="nav-button">Vehicle Inspection</button>
          </Link></li>
          <li><Link className="nav-btn" to="/driver-dashboard/load-information">
            <button className="nav-button">Load Information</button>
          </Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* <h1 className="dashboard-title">Driver Dashboard</h1> */}
        <Switch>
          <Route path="/driver-dashboard/driver-info" component={DrivingLogForm} />
          <Route path="/driver-dashboard/vehicle-inspection" component={VehicleInspectionForm} />
          <Route path="/driver-dashboard/load-information" component={DriverLoadList} />
        </Switch>
      </div>
    </div>
  );
}

export default DriverDashboard;
