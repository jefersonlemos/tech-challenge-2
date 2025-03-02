import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectaNaDatabase() {
  const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

  mongoose.connect(mongoUri);

  return mongoose.connection;
}

export default conectaNaDatabase;
