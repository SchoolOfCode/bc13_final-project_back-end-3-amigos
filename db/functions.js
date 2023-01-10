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

export async function createUserTable() {
  await pool.query(
    "CREATE TABLE users(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR, email VARCHAR, password VARCHAR)"
  );
}
// try {
//   createUserTable();
// } catch (error) {
//   console.log(error);
// } finally {
//   await pool.end();
// }
