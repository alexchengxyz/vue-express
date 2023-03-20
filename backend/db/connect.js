import mongoose from 'mongoose';

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);

    console.log('MongoDB is Connected...');
  }
  catch (error) {
    console.error(error.message);
  }
}

export default connectDB;
