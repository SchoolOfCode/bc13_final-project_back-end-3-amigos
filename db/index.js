// import pg  package
// Connection string from elephantSQL in .env

import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

export const databaseUrl = process.env.URL;

export const pool = new pg.Pool({ connectionString: databaseUrl });
