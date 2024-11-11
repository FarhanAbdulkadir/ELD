import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          The ELD (Electronic Logging Device) system consists of two key dashboards: 
          the Driver Dashboard and the Dispatch Dashboard. 
          The Driver Dashboard allows drivers to send their location, start time, and end time at the end of each workday. 
          This data is crucial for maintaining accurate logs of the drivers work hours and ensuring compliance with regulations.         
         </p>

          <p>
          The Dispatch Dashboard enables dispatchers to view the real-time location and work status of drivers.
           Once drivers report their location and working hours, dispatchers can monitor their status to ensure they are on duty and available for assignments.
          Dispatchers can then find loads and assign them to the appropriate driver based on location and availability.
          </p>

          <p>
          Additionally, the Dispatch Dashboard provides flexibility for dispatchers, allowing them to reassign or delete loads if necessary. 
          This feature ensures that load assignments can be adjusted based on changing circumstances or availability, optimizing fleet operations and ensuring timely deliveries.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />
{/* 
          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
