
// configuration .env
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.DATABASE, clientOptions);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
       } catch (error) {
        console.error(error.message)
        //quitter le process 
        process.exit(1)
    }
    // finally {
      //   // Ensures that the client will close when you finish/error
      //   await mongoose.disconnect();
      // }
}
connectDB().catch(console.dir);
//configuration mongo
// const connectDB = async () => {
//     try {
//     await mongoose.connect(process.env.DATABASE)
//     console.log('Connection to Mongo DB')
        


// }
module.exports = connectDB

