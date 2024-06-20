const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./database/connection')
const routes = require('./routes')
const bodyParser = require("body-parser")

//Lecture des configurations
dotenv.config()
connectDB()

//Lancement du serveur
const app = express()

//MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//Définition des sécurités du serveur
app.use(express.json({ extended: false}))
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true)
            if (process.env.WHITELIST.indexOf(origin) === -1) {
                let message = 
                "The CORS policy for this origin doesn't " +
                'allow access from the particular origin.'
            return callback(new Error(message), false)
            }
            return callback(null, true)
        }, 
    })
)


//DEMARRAGE DU SERVER
app.listen(process.env.PORT, () => {
    console.log(`API is running on ${process.env.SERVER_URL}`)
})

app.use('/', routes);
// app.use('/users', users)





