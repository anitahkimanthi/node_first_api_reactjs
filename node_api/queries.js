// import pool to use it for quering the database
// connect to the database so you can perform the CRUD actions using (const pool = new Pool({databasedetails}))
// create functions to enable users from client side interact with the apis via CRUD
// export the functions by creating an object of function using (module.exports = { functions})

// 1. import the poll
const Pool = require('pg').Pool

// 2. connect to the database using pool
const pool = new Pool({
  host: 'localhost',
  user: 'anitah',
  database: 'first_database',
  password: 'hanny@blsliz5',
  port: 5432
})

// 3. interact with the database from client sside
// get all users function

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// get user by id
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// update user
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email, phone_number, age, gender } = request.body

  pool.query(
    'UPDATE users SET username=$1, email=$2, phone_number=$3, age=$4, gender=$5 WHERE id=$3 ',
    [username, email, phone_number, age, gender, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`user with id ${id} was updated successifully`)
      getUsers()
    }
  )
}

// create new user
const createUser = (request, response) => {
  const { username,email,phone_number,age,gender,password } = request.body
  const createTable = `CREATE TABLE IF NOT EXISTS users (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone_number VARCHAR(40) NOT NULL UNIQUE,
    age INT CHECK(age > 0) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
  )`;

  pool.query(
    'INSERT INTO users (username,email,phone_number,age,gender,password) VALUES($1, $2,$3,$4,$5, $6) RETURNING *',
    [username,email,phone_number,age,gender,password],
    (error, results) => {
      if (error) {
        throw error
      }
      console.log(response.status())
      response
        .status(200)
        .send(results.rows[0], "ACcount created successifully")
    }
  )
}

// delete a user
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`user with id ${id} was successifully deleted`)
  })
}

// export the function so you can use then in the index.js file
module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
}
