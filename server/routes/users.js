const express = require("express")
const { default: mongoose } = require("mongoose")
const User = require('../database/models/user')
const router = express.Router()

router.get("/users", (req, res) => {
    res.status(200).json({message: "Tout les utilisateurs"})
    console.log(req.body)
    res.json({ message: req.body.message})
})

router.get("/:id", (req, res) => {
    req.params.id
    res.status(200).json({
        id: req.params.id
    })
})

// router.post("/register", (req, res) => {
//     console.log(req.body)
//     res.json({ message: req.body.message})
// })

module.exports = router