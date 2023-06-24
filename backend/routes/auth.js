const express = require('express')
const router = express.Router()
const User = require('../models/User')
// For Validation
const { body, validationResult } = require('express-validator');
// For password hashing
const bcrypt = require('bcryptjs')
//JWT token
const jwt = require('jsonwebtoken')
//JWT secret
const JWT_SECRET = "sajidisgoodboy"



// Create a User using: POST endpoint:"/api/auth/createuser". No login require
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors , return Bad request and the errors
    const error = validationResult((req))
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    try {
        // check wheather the user with this email exits already
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exits" })
        }
        //password hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        // send token and that taken have user id 
        const data = {
            user: {
                id: user.id
            }
        }

        //jwt auth sign
        const authToken = jwt.sign(data, JWT_SECRET)

        // send response --auth token not user

        // res.json(user)
        res.json({ authToken })
        // catch the error
    } catch (error) {
        console.error(error.message)

        res.status(500).send("Some Error occured")
    }


})


module.exports = router