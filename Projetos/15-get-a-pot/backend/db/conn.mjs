import dotenv from 'dotenv';
dotenv.config();
const mongoUri = process.env.MONGO_URI;
import mongoose from "mongoose";

const conn = mongoose;

async function main() {
  try {
    await conn.connect(mongoUri);
  } catch (error) {
    console.error( error.message);
    process.exit(1);
  }
}

main();

export default conn;