import mongoose from 'mongoose';


const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
export default connectToDb;