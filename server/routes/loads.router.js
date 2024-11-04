const express = require('express');
//const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require("../modules/pool");
const router = express.Router();


// route to post loads 
router.post('/' ,(req, res)=>{
const loads = req.body;

const sqlText = `INSERT INTO "loads" ("description", "time", "pickup_location", "dropoff_location", "user_id")
VALUES ($1, $2, $3, $4, $5);
`

    pool.query(sqlText, [loads.description, loads.time, loads.pickup_location, loads.dropoff_location, loads.user_id])
          .then(result=>{
            console.log('add new loads', loads);
            res.sendStatus(201);

          })
          .catch((error)=>{
            console.log('error adding new loads', error)
            res.sendStatus(500);
          })

})

// Route to fetch all available loads
router.get('/',  (req, res) => {
    console.log('in /loads route')
    const queryText = `
      SELECT * FROM "loads"
    `;
    pool.query(queryText)
      .then(result => res.json(result.rows))
      .catch((err) => {
        console.log('Error fetching loads:', err);
        res.sendStatus(500);
      });
});


// Route to update loads 

router.put ('/:id', (req, res)=>{
  const loadId = req.params.id; // get the load id from the request params 
  const loads = req.body; // get the updated load data from the req body 

  const sqlText = ` UPDATE "loads"
                    SET "description" = $1, "time" = $2, "pickup_location" = $3, "dropoff_location" = $4, "user_id" = $5
      WHERE "id" = $6;
                         `;
  pool.query(sqlText,[loads.description, loads.time, loads.pickup_location, loads.dropoff_location, loads.user_id, loadId])
  .then(result => 
    res.json(result.rows))
  .catch((err) => {
    console.log('Error updating the load:', err);
    res.sendStatus(500);
  });
});


// Route to delete a specific by ID 

router.delete('/:id', (req, res)=>{


  const loadId = req.params.id; // gte the load by ID from the req params 

  const sqlText = ` DELETE FROM "loads" WHERE "id" = $1`; 

  pool.query(sqlText, [loadId])
      .then(result => 
        res.json(result.rows))
      .catch((err) => {
        console.log('Error deleting the load:', err);
        res.sendStatus(500);
      });
    });

  
// TESTED this driver route with postman and it works 
       
// Fetch all driver info
router.get('/driver', (req, res) => {
  const queryText = `SELECT * FROM "driverInfo"`;

  pool.query(queryText)
      .then(result => res.status(200).send(result.rows))
      .catch(err => {
          console.log('Error fetching driving logs:', err);
          res.sendStatus(500);
      });
});


module.exports = router;
