/**
 * import node modules needed
 */

import express from "express";

/**
 * initialize a new express server
 */
const app = express();

/**
 * set app to listen to port 3001
 */
app.listen("3001", function () {
  console.log("Server is listening to port 3001.");
});
