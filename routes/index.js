/**
 * import express
 * import index.js from models
 * import router from express
 */

import express from "express";
import { getFavouritesByUserId, addNewFavourite, addNewUsers } from "../models/index.js";

const router = express.Router();

// GET: favourites by user ID
router.get("/:id", async function (req, res) {
  const response = await getFavouritesByUserId(req.params.id);
  res.status(200).json({
    success: true,
    payload: response,
  });
});


// POST: new favourite location 
router.post("/",async function (req, res){
if(req.body.username) {
  const response = await addNewUsers(req.body);
  res.status(200).json({
    success: true,
    payload: response
  })
} else {
  const response = await addNewFavourite(req.body);
  res.status(200).json({
  success: true,
  payload: response
})

}


})



export { router };
