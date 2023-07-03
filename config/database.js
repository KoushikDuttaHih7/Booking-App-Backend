import mongoose from 'mongoose'

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MONGODB CONNECTED AT :-> ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected',()=>{
  console.log('MONGODB DISCONNECTED');
});

mongoose.connection.on('connected',()=>{
  console.log('MONGODB CONNECTED');
});

// module.exports = connectDB;
export default  connectDB;