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
  database: 'firstapis',
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
  const { username, email, phone_number, age, gender } = request.body
  pool.query(
    'INSERT INTO users (username, email,phone_number,age,gender) VALUES($1, $2,$3,$4,$5,$6)',
    [username, email, phone_number, age, gender],
    (error, results) => {
      if (error) {
        throw error
      }
      response
        .status(200)
        .send(`User with id ${results.id} was created successifully`)
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
