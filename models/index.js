/**
 * import pool from db folder index.js
 */
import { response } from "express";
import { pool } from "../db/index.js";

/**
 *  an async await fn to get all the favourites by the uid
 */
export async function getFavouritesByUserId(uid) {
  // use pool.query to open database connection

  const res = await pool.query(
    // use the inner join to select user's favourite places by uid
    // used the $1 to secure the uid
    `SELECT user_favourites.uid, xid, title, city, country, suburb, description, image FROM user_favourites INNER JOIN users on user_favourites.uid=users.uid WHERE user_favourites.uid= $1`,
    [uid]
  );
  return res.rows;
}

// POST- add new user favourite to database 
export async function addNewFavourite(favourite) {
  const res = await pool.query(
    `INSERT INTO user_favourites (uid, xid, title, city, country, suburb, description, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*;`,
    [
      favourite.uid,
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
    `INSERT INTO users (username, email, password, uid) VALUES ($1, $2, $3, $4) RETURNING*;`,
    [users.username, users.email, users.password, users.uid]
  );
  return res.rows;
}

//DELETE - location by xid AND uid, which comes through as an object from the front end
export async function deleteFavouriteById(data) {
  const res = await pool.query(
    `DELETE FROM user_favourites WHERE xid = $1 AND uid = $2 RETURNING*;`,
    [data.xid, data.uid]
  );
  return res.rows;
}
