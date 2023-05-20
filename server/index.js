const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {moongose, default: mongoose} = require('mongoose');
const cookieParser = require('cookie-parser')
const app = express();

//Database conecction
mongoose.connect(process.env.MONGO_URL)
.then( () => console.log('Database connected'))
.catch((err) => console.log('Database not conected',err))

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))


