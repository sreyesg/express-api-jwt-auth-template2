const expres = require('express')
router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const SALT_LENGTH = 12

router.post('/signup', async(req, res) => {
    try {
        const userInDatabase = await User.findOne({username: req.body.username})
        
        if(userInDatabase){
            return res.status(400).json({error: "username already exist"})
        }
        const user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })
        res.status(201).json({ user })
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router