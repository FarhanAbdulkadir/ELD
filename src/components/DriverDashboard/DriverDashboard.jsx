import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DrivingLogForm from '../DrivingLogForm/DrivingLogForm';
import VehicleInspectionForm from '../VehicleInspectionForm/VehicleInspectionForm';
import DriverLoadList from '../LoadInformation/LoadInformation';

function DriverDashboard() {
  // const [userId, setUserId] = useState(null);

  // useEffect (()=>{
  //   const loggedInUserId = localStorage.getItem("id");
  //   if(loggedInUserId){
  //     setUserId(loggedInUserId)
  //   }
  // },[]);
  
  return (
   
      <div>
        <h1>Driver Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/driver-dashboard/driver-info">Driver Information</Link></li>
            <li><Link to="/driver-dashboard/vehicle-inspection">Vehicle Inspection</Link></li>
            <li><Link to="/driver-dashboard/load-information">Load Information</Link></li>
          </ul>
        </nav>

        <Route path="/driver-dashboard/driver-info" component={DrivingLogForm} />
        <Route path="/driver-dashboard/vehicle-inspection" component={VehicleInspectionForm} />
        <Route path="/driver-dashboard/load-information" component={DriverLoadList}/>
                      
         
        
      </div>
   
  );
}

export default DriverDashboard;
