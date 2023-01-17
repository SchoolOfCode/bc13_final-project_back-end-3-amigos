/**
 * import pool from db folder index.js
 */

import { response } from "express";
import { pool } from "../db/index.js";

/**
 *  an async await fn to get all the favourites by the user id
 */

//Note: after implmenting the AUTH we might need to change the way we are getting the data e.g not to show username, password and email - will come back to this once the auth is implemented
// Added xid here so it is returned in object 
export async function getFavouritesByUserId(id) {
  // use pool.query to open database connection
  const res = await pool.query(
    // use the inner join to select favourites places by user's id
    // used the $1 to secure the id
    `SELECT user_favourites.id, xid, title, city, country, suburb, description, image FROM user_favourites INNER JOIN users on user_favourites.user_id=users.id WHERE user_id= $1`,
    [id]
  );
  console.log(res.rows)
  return res.rows;
}

// POST- add new favourite
// added xid here, and favourite.xid, so the new db entry for favourites contains xid
export async function addNewFavourite(favourite) {
  const res = await pool.query(
    `INSERT INTO user_favourites (user_id, xid, title, city, country, suburb, description, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*;`,
    [
      favourite.user_id,
      favourite.xid,
      favourite.title,
      favourite.city,
      favourite.country,
      favourite.suburb,
      favourite.description,
      favourite.image,
    ]
  );
  return res.rows;
}

// POST add new user
export async function addNewUsers(users) {
  const res = await pool.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING*;`,
    [users.username, users.email, users.password]
  );
  return res.rows;
}

//DELETE - location by xid
// changed this here so that it uses xid instead of id
export async function deleteFavouriteById(xid) {
  const res = await pool.query(
    `DELETE FROM user_favourites WHERE xid = $1 RETURNING*;`,
    [xid]
  );
  return res.rows;
}
