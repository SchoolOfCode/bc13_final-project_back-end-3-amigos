// Create an index.js
// import pg  package
// Connection string from elephantSQL in .env
// import the pg-pool from index.js
//  for every function repeat the following steps:-
//  import user, userFavourites from data.js
//  Create the user table with pool.query
// Call this function to create a table in elaphantSQL (try,catch & finally)
//  Export the function
//  import it in app.js

import { pool } from "./index.js";
import { user, userFavourites } from "./data.js";

/**
 *  this fn will create the users table
 */
export async function createUserTable() {
  await pool.query(
    "CREATE TABLE users(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR, email VARCHAR, password VARCHAR)"
  );
}

/**
 * call the function once to created in the elephantSQL
 */

// try {
//   createUserTable();
// } catch (error) {
//   console.log(error);
// } finally {
//   await pool.end();
// }

/**
 * this fn will create the userFavourites table
 */

export async function createUserFavouritesTable() {
  await pool.query(
    "CREATE TABLE user_favourites(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, user_id INT REFERENCES users(id), title VARCHAR, city VARCHAR, country VARCHAR, suburb VARCHAR, description VARCHAR, image VARCHAR)"
  );
}

// try {
//   createUserFavouritesTable();
// } catch (error) {
//   console.log(error);
// } finally {
//   await pool.end();
// }
