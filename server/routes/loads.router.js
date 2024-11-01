const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require("../modules/pool");
const router = express.Router();


// Route to fetch all available loads
router.get('/loads', rejectUnauthenticated, (req, res) => {
    console.log('in /loads route')
    const queryText = `
      SELECT "id", "description", "pickup_location", "dropoff_location" 
      FROM "loads"
    `;
    pool.query(queryText)
      .then(result => res.json(result.rows))
      .catch((err) => {
        console.log('Error fetching loads:', err);
        res.sendStatus(500);
      });
});



module.exports = router;
