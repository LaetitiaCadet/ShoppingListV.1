
// configuration .env
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

//configuration mongo
const connectDB = async () => {
    try {
    await mongoose.connect(process.env.DATABASE)
    console.log('Connection to Mongo DB')    
    } catch (err) {
        console.error(err.message)
        //quitter le process 
        process.exit(1)
    }
    
}
module.exports = connectDB

