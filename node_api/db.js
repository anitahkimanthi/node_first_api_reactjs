// require pg used for connecting to db
const pool = require('pg').Pool

// require json web token for creating token
const jwt = require('jsonwebtoken')

// require dotdev to help in bringing the token into the node project
const dotenv = require('dotenv')

// get config variables
dotenv.config();

// access config variables
process.env.TOKEN_SECRET;

// connection to the database
const connect = new Pool({
    host : "localhost",
    user : "anitah",
    database : "first_database",
    password : "hanny@blsliz5",
    port : 5452
})

// create a function to generate token
// pass the 
const generateToken = (username) =>{

}
