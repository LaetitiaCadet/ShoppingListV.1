// import des modules
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
// const tokenValidation = require('../middleware/tokenValidation')
//Création des routes
router.get('/', (req, res) => {
    console.log(req.body)
    res.send('API is running.')
})

router.post('/register', userController.createUser)

// router.post('/login', userController.loginUser)


module.exports = router