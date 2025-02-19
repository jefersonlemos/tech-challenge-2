import mongoose from "mongoose";

async function conectaNaDatabase() {
  mongoose.connect(process.env.MONGODB_URI as string);

  return mongoose.connection;
}

export default conectaNaDatabase;
