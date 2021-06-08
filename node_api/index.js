const db = require('./queries')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5454

// register the body parser middleware or any other middlewares here
app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// all cors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});  

// handling GET HTTP requests
// Routes for all the CRUD functions
// http request methods (GET, PUT, POST AND DELETE), route url(/users), etc, function (db.function)
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// listen at which port is the app running at
app.listen(port, () => {
    console.log(`app running at ${port}`)
  })
  