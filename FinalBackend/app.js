const express = require('express')
const app = express()

const fs = require('fs')
const path = require('path')
const morgan = require('morgan')



const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'requests.log'),
    { flags: 'a' }
)
app.use(morgan('combined', { stream: accessLogStream }))

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

const farmRoutes = require('./routes/farmerRoutes')
const authRoutes = require('./routes/authRoutes')
const customerRoutes = require('./routes/customerRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(authRoutes)
app.use(farmRoutes)
app.use(customerRoutes)

mongoose.connect("mongodb://localhost:27017/583FinalDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('583FinalDB Server running on 3000')
        })
    })
    .catch((err) => {
        console.log(err)
    })
