import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/dbConnection.config.js";
import adminSeed from "./admin.seed.js";
import userSeed from "./user.seed.js";

const Seed = async () => {
  try {
    connectDB();

    await adminSeed();
    await userSeed();
    //Call The Function which we need to Seed.
  } catch (error) {
    console.log(error.message);
  }
  finally{
    process.exit(1);
  }
};

Seed();