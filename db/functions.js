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
// Added xid VARCHAR to create user favourites table
// possible hiccup: make sure xid is passed down as xid and in the correct position to the function ' add to user favourites'

import { pool } from "./index.js";
import { user, userFavourites } from "./data.js";

/**
 *  this fn will create the users table
 */
export async function createUserTable() {
  await pool.query(
    "CREATE TABLE users(id INT GENERATED ALWAYS AS IDENTITY, username VARCHAR, email VARCHAR, password VARCHAR, uid VARCHAR PRIMARY KEY)"
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
    "CREATE TABLE user_favourites(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, uid VARCHAR REFERENCES users(uid), xid VARCHAR, title VARCHAR, city VARCHAR, country VARCHAR, suburb VARCHAR, description VARCHAR, image VARCHAR)"
  );
}

export async function createJournalTable() {
  await pool.query(
    "CREATE TABLE journal(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, uid VARCHAR REFERENCES users(uid), title VARCHAR, location VARCHAR, text VARCHAR, date DATE )"
  );
}

// try {
//   createJournalTable();
// } catch (error) {
//   console.log(error);
// } finally {
//   await pool.end();
// }

/* 
use pool.query to insert/seed data into table 
async await function 
apply JSON.stringify() to convert data to JS Object 
*/

export async function insertDataUsers() {
  return await pool.query(
    `INSERT INTO users(username, email, password, uid) (SELECT username, email, password, uid FROM json_populate_recordset(NULL::users, $1::JSON));`,
    [JSON.stringify(user)]
  );
}

// try {

//   insertDataUsers();
// } catch (error) {
//   console.log(error);
// } finally {
//   await pool.end();
// }

// 	insertDataUsers();
// } catch (error) {
// 	console.log(error);
// } finally {
// 	await pool.end();
// }

export async function insertDataUserFavourites() {
  return await pool.query(
    `INSERT INTO user_favourites(uid, xid, title, city, country, suburb, description, image) (SELECT uid, xid, title, city, country, suburb, description, image FROM json_populate_recordset(NULL::user_favourites, $1::JSON));`,

    [JSON.stringify(userFavourites)]
  );
}

// try {
//   insertDataUserFavourites();
// } catch (error) {
//   console.log(error);
// } finally {
//   await pool.end();
// }

//function to delete user table
export async function deleteUserTable() {
  await pool.query(`DROP TABLE users`);
}

// try {
//   deleteUserTable();
// } catch (error) {
//   console.log(error);
// } finally {
//   await pool.end();
// }

// function to delete user_favourites table
export async function deleteUserFavouritesTable() {
  await pool.query(`DROP TABLE user_favourites`);
}

// try {
//   deleteUserFavouritesTable();
// } catch (error) {
//   console.log(error);
// } finally {
//   await pool.end();
// }
