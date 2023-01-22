/**
 * import express
 * import index.js from models
 * import router from express
 */

import express from "express";
import {
  getFavouritesByUserId,
  addNewFavourite,
  addNewUsers,
  deleteFavouriteById,
} from "../models/index.js";

const router = express.Router();

// GET: favourites by uid
router.get("/:uid", async function (req, res) {
  const response = await getFavouritesByUserId(req.params.uid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

// POST: new favourite location AND
// POST: new user
router.post("/", async function (req, res) {
  console.log(req.body);
  // changed username to uid to validate the user.
  if (req.body.uid) {
    const response = await addNewUsers(req.body);
    console.log(response);
    res.status(200).json({
      success: true,
      payload: response,
    });
  } else {
    const response = await addNewFavourite(req.body);
    console.log(response);
    res.status(200).json({
      success: true,
      payload: response,
    });
  }
});

// DELETE: by uid and xid, passed through as an object in the body from the front end
router.delete("/", async function (req, res) {
  const response = await deleteFavouriteById(req.body);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

export { router };
