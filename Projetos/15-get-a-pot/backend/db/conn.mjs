import mongoose from "mongoose";

const conn = mongoose;

async function main() {
  try {
    await conn.connect('mongodb://localhost:27017/getapot');
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Falha ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
}

main();

export default conn;