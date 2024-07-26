const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../database/models/user")
const List = require("../database/models/list")
const dotenv = require("dotenv")

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
            console.log(newUser)
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
        // Je récupère l'email de l'utilisateur 
        const user = await User.findOne({email: req.body.email})
        if (!user){
            //j'envoi un msg d'erreur si User n'est pas en Bdd
            throw new Error("Adresse email inexistant")        
        } 

        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid){
            //j'envoi un msg d'erreur si le mode passe ne correspond pas
            throw new Error("Le mot de passe est incorrect")
        }

        console.log(user._id, user.name)
       // const xsrfToken = crypto.randomBytes(64).toString('hex');

        //on créer le JWT
        const accessToken = jwt.sign(
                
            {id: user._id, name: user.name}, 
            'RANDOM_TOKEN_SECRET',
            {expiresIn: "24h"}
        );

        // création du refresh token et on le stoke dans la bdd
        // const refreshToken = crypto.randomBytes(128).toString('base64')

        // await refreshToken.create({ 
        //     userId: user.id,
        //     token: refreshToken,
        //     expireAt: Date.now() + config.refreshToken.expiresIn
        // });

        response.status = 200
        response._id = user._id
        response.name = user.name
        response.token = accessToken
        response.message = "User successfully logged in"

        return res.json(response);

    } catch (error) {
        console.error(error)
        response.status = 400 
        response.message = error.message 
        // res.status(500).json({ message: 'Internal server error' })
    }
    res.status(response.status).send(response)
      
}

// Récupération donnée utilisateur 
module.exports.getUserProfil = async (req, res) => {
    let response = {}
    try {
        const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
        const decodedToken = jwt.decode(jwtToken)
        const user = await User.findOne({_id: decodedToken.id})

        if(!user){
            throw new Error ('User not found')
        }

        response.status = 200
        response.message = 'Successfully got user profile data'
        response.name = user.name


    } catch (error) {
        console.error('Error in userController', error)
        throw new Error(error)
    }
    res.status(response.status).json(response)
}
//récupération des lists par utilisateur 
module.exports.getAllLists = async (req, res) => { 
    const response = {}
    const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedToken = jwt.decode(jwtToken)
    const user = await User.findOne({_id: decodedToken.id})

    try {
        const userLists = await List.find({user_id: user._id})
        console.log(userLists)
        console.log('liste récupéré')
        
        if(!userLists){
            throw new Error ('list not found')
        }

        response.status = 200
        response.message = 'Successfully got list profile data'
        response.lists = userLists


    } catch (error) {
        console.error('Error in userController', error)
        throw new Error(error)
    }
    res.status(response.status).json(response)
}
//création d'une nouvelle liste de course 
module.exports.createShoppingList = async (req, res) => {
    let response = {}

    const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedToken = jwt.decode(jwtToken)
    const user = await User.findOne({_id: decodedToken.id})
    console.log(user._id)

    try {
        const list = new List (req.body);
        list.user_id = user._id 
        console.log(list)
        const savedList = await list.save()

        res.status(201).json(savedList);        
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
