const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const testJWTRouter = require('./controllers/test-jwt')
const usersRouter = require('./controllers/users')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})




app.use(express.json())


app.use('/test-jwt', testJWTRouter)
app.use('/users', usersRouter)


app.listen(3000, () => {
    console.log('App ready!')
})