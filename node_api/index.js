const db = require('./queries')
const express = require('express')
const { response } = require('express')
const app = express()
const port = 5454

// register the body parser middleware or any other middlewares here
// parse application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true
  })
)

// parse application/json
app.use(express.json())

// all cors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

// handling GET HTTP requests
// Routes for all the CRUD functions
// http request methods (GET, PUT, POST AND DELETE),  route url(/users), etc, request and response params, function (db.function) and promises
app.get('/users', (req, res) => {
  db.getUsers()
    .then(response => {
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.get('/users/:id', (req, res) => {
  db.getUserById(req.params.id)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.post('/register', (req, res) => {
  console.log(res.status())
  db.createUser(req.body)
    .then(response => {
      console.log(res)
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.put('/users/:id', (req, res) => {
  db.updateUser(req.body, req.params.id)
    .then(response => {
      res.status(201).send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.delete('/users/:id', (req, res) => {
  db.deleteUser(req.params.id)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

// listen at which port is the app running at
app.listen(port, () => {
  console.log(`app running at ${port}`)
})
