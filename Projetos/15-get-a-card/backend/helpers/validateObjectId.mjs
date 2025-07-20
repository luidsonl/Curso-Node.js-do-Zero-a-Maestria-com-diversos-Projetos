import mongoose from 'mongoose';

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) &&
         String(new mongoose.Types.ObjectId(id)) === id;
}

export default validateObjectId;