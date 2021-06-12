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

// create users table
const createDatabase = () => {
  const text = `CREATE TABLE users`

  new Promise(function (resolve, reject) {
    pool.query(text, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('database created successifully')
    })
  })
}

// 3. interact with the database from client sside
// get all users function

const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

// get user by id
const getUserById = id => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}

// update user
const updateUser = (body, id) => {
  return new Promise(function (resolve, reject) {
    const { username, email, phone_number, age, gender } = body.body
    pool.query(
      `UPDATE users SET username=$1, email=$2, phone_number=$3, age=$4, gender=$5 WHERE id=$6`,
      [username, email, phone_number, age, gender, id],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('User detals updated successifully')
      }
    )
  })
}

// create new user
const createUser = body => {
  return new Promise(function (resolve, reject) {
    const { username, email, phone_number, age, gender, password } = body.body

    const createTable = `CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone_number VARCHAR(40) NOT NULL UNIQUE,
    age INT CHECK(age > 0) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
  )`
    pool.query(
      'INSERT INTO users (username,email,phone_number,age,gender,password) VALUES($1, $2,$3,$4,$5, $6) RETURNING *',
      [username, email, phone_number, age, gender, password],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('User created successifully')
      }
    )
  })
}

// delete a user
const deleteUser = id => {
  return new Promise(function (resolve, reject) {
    console.log(id)
    pool.query('DELETE FROM users WHERE id=$1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('Account was successifully deleted')
    })
  })
}

// export the function so you can use then in the index.js file
module.exports = {
  createDatabase,
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
}
