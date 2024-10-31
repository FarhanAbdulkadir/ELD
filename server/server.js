const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const driverDashboard = require('./routes/DriverDashboard.router');
const loadAssignmentsRouter = require('./routes/loadAssignments.router'); // Add this line
const vehicleInspectionRouter = require('./routes/vehicleInspection.router');
// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/driving-log', driverDashboard);
app.use('/api/load-assignments', loadAssignmentsRouter);
app.use('/api/vehicle-inspection', vehicleInspectionRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
