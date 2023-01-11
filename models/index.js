/**
 * import pool from db folder index.js
 */

import { response } from "express";
import { pool } from "../db/index.js";

/**
 *  an async await fn to get all the favourites by the user id
 */

export async function getFavouritesByUserId(id) {
  // use pool.query to open database connection
  const res = await pool.query(
    // use the inner join to select favourites places by user's id
    // used the $1 to secure the id
    `SELECT * FROM user_favourites INNER JOIN users on user_favourites.user_id=users.id WHERE user_id= $1`,
    [id]
  );
  return res.rows;
}

// POST- add new favourite
export async function addNewFavourite(favourite){
  const res = await pool.query( 
    `INSERT INTO user_favourites (user_id, title, city, country, suburb, description, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*;`, [favourite.user_id, favourite.title, favourite.city, favourite.country, favourite.suburb, favourite.description, favourite.image]
  );
  return res.rows;
}

// POST add new user
