const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
  user: process.env.USER,
  database: process.env.DATABASE,
  port: 5432,
  password: process.env.DB_PASSWORD
});
pool.on('connect', () => {
  console.log('connected to the db');
});
const createProductTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      products(
        id UUID PRIMARY KEY,
        picture VARCHAR(128) NOT NULL,
        numberOfRooms VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        owner_id UUID NOT NULL,
        isAdmin BOOLEAN,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        firstname VARCHAR(128),
        lastname VARCHAR(128),
        phonenumber VARCHAR(128),
        address VARCHAR(128),
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        isAdmin BOOLEAN,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
const dropProductTable = () => {
  const queryText = 'DROP TABLE IF EXISTS products';
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
const createAllTables = () => {
  createUserTable();
  createProductTable();
};
const dropAllTables = () => {
  dropUserTable();
  dropProductTable();
};
pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createProductTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropProductTable,
  dropAllTables
};
require('make-runnable');
// node db createTables
