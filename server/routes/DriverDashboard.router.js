const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const router = express.Router();
const pool = require('../modules/pool');



router.post('/driving-log', rejectUnauthenticated,(req, res)=>{
    const { location, start_time, end_time } = req.body;

    const queryText = `INSERT INTO "driving_logs" (location, start_time, end_time) 
                            VALUES ($1, $2, $3) RETURNING id
    `;

    pool.query(queryText, [location, start_time, end_time]) 
    .then(() => res.sendStatus(201)) 
    .catch((err) => { 
        console.log('Error saving driving log:', err); 
        res.sendStatus(500);
     }); 
    
    
});

module.exports = router
