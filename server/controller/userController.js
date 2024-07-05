const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../database/models/user")
const { config } = require("dotenv")

// Creation d'un nouvel utilisateur 
module.exports.createUser = async (req, res) => {
    try {
        // On recherche dans la db si l'email rentré n'existe pas
        const userMail = await User.findOne({ email:req.body.email})
        if (userMail){
            throw new Error ('Email already exists')
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 12)

            const newUser = new User({
                _id: req.body._id,
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            });

            let result = await newUser.save()
            .then(() => res.status(201).json({msg: newUser}))
            return result
            // let result = await newUser.save()
            // .then(() => res.status(201).json({message: 'Nouvel utilisateur créer avec succes !'}))
            // return result
        }            
    } catch (error) {
        console.error('Error in service', error) 
    }
}

//Connexion d'un utilisateur 
module.exports.loginUser = async (req, res) => {
    let response = {}
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user){
            throw new Error("Adresse email inexistant")        
        } 

        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid){
            throw new Error("Le mot de passe est incorrect")
        }

       // const xsrfToken = crypto.randomBytes(64).toString('hex');

        // const token = jwt.sign(

        //     {id: user._id, name: user.name}, 
        //     config.token.secret,
        //     { 
        //         algorithm: config.token.algorithm,
        //         audience: config.token.audience,
        //         expiresIn: config.token.expiresIn / 1000, //Le délai avant expiration exprimé en seconde
        //         subject: user._id.toString()
        //     }            
        // )

        // const refreshToken = crypto.randomBytes(128).toString('base64')
// 
        response.status = 200
        response._id = user._id
        response.message = "User successfully logged in"
        // response.token = token
        // res.json({token})

    } catch (error) {
        console.error(error)
        response.status = 400 
        response.message = error.message 
        
    }
    res.status(response.status).send(response)
     
    
}
