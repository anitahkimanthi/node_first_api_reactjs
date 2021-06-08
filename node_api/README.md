# NODE JS FIRST API
The project has basic CRUD function `GET, PUT, POST and DELETE`

It uses postgreSQL database, Node.js and Express server.

## DATABASE SETUP
[Download](https://www.postgresql.org/download/) the postgreSQL installer in your local machine.

Once the download is complete, follow [this stepps](https://www.w3resource.com/PostgreSQL/install-postgresql-on-linux-and-windows.php) to install and setup the database in your machine using either linux or windows.

## CREATE ROLES, DATABASE AND TABLES

### Linux
#### connect to the default database
On the terminal type; `psql postgres` to connect to the default database. Now you'll be prompt with  `postgres=#`
####  Create role/users
Type; `CREATE ROLE username WITH PASSWORD 'password';`

#### Give the created user/role permission to create databases
`ALTER ROLE username CREATEDB`;

#### Creating database using the created role/user
Quit from the session using command `\q`.

Now run; `psql -d postgres -U username`.

Now instead of `postgres=#` you'll be prompt with `postgres=>` meaning you are no longer logged in as a superuser but as user you just created.

Run: `CREATE DATABASE databasename;` to create the database.
To view the database run; `postgres=> \list`. Check more postgreSQL commands [here](https://www.postgresqltutorial.com/psql-commands/).

#### Switching to the database you created
Type: `\c databasename` to connect to the database. Now you'll be prompt with `databasename=>` instead of `postgres=>` and now you can interact with the database by either creating tables, inserting data in the tables, etc

#### Creating tables
On `database=>` type: `CREATE TABLE tablename (ID SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL, email VARCHAR(200) NOT NULL, phone_number VARCHAR(50) NOT NULL, age INT CHECK(age > 0) NOT NULL, gender VARCHAR(20) NOT NULL, password VARCHAR(100) NOT NULL, created_date TIMESTAMP NOW(), modified_date TIMESTAMP NOW()`;

The above command will create a table by which users will be required to post the data with the fields indicated in the table `username, email, phone_number, age, gender, password`. `NOT NULL` constraint is used to reject all the null fields during post.

#### Inserting users using terminal
Type; `INSERT INTO tablename (username, email, phone_number, age, gender, password) VALUES('John','john@gmail.com','+254717984562','30','Male','password',);`. Now the user will be added into the table and you can retrive the users inserted using `GET` request On the client-side or use `SELECT * FROM tablename` on the terminal -  `connected database terminal`.

#### Setting up Node.js and Express.js server
##### creating the project folder
Create the project folder by typing : `mkdir projectname` on the terminal.
Enter: `npm init -y` to create package.json file.

Get into the project directory; `cd projectname`

##### Installing Express server
Run: `yarn add experess pg`

##### creating project required files
Create `index.js` file using: `touch index.js` or do it manually by opeing your preferred text editor and create `index.js` file and save. 

This file will be used as the entry point to the server. It will require `express` - `const express = require('express')`, `db` - `const db = require('./queries')` to be created. `port` number eg; `5000` - `const port = 5000`, `bodyParser` middleware  - `const bodyParser = require('body-parser')`, responsible for parsing the incoming request bodies in a middleware before you handle it and  `app` - `const app = express()`.

After adding the above constants now register the bodyParser middleware `app.use(bodyParser.json())` and `app.use(bodyParser.urlencoded({ extended: true}))`

After registering bodyParser middleware now, handle the HTTP requests. formart: `method (GET,POST,PUT and DELETE)`, `Route url` and the `function(eg; getUsers)`. So, you'll use `app.get('/url', db.function)`.

Create `queries.js` file to use in creating all the CRUD functions `GET, POST, PUT DELETE`, require pool - `const Pool = require(pg).Pool` used in connecting to database `const pool = new Pool({all the database details - port, user, database, password})` for database specifications, quering the database `pool.query(actions)` and exporting the functions- `module.exports = {all the functions created}`





