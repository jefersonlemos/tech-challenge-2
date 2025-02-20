import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectaNaDatabase() {
  mongoose.connect(process.env.MONGODB_URI as string);

  return mongoose.connection;
}

export default conectaNaDatabase;
