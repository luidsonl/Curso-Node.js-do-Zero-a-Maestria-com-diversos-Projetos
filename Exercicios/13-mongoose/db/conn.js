import mongoose from "mongoose";

const conn = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mongoose', {
        });
        console.log('MongoDB conectado!')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

export default conn