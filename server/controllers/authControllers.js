const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

//Register endpoint
const registerUser = async (req, res) =>{
    try{
        const {name, email, password} = req.body;
        //Check if name was entered
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: "Email is required"
            })
        }
        //Check email
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'Email is taken already'
            })
        };

        //Check if password is good
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be al least 6 character long'
            })
        };

        const hashedPassword = await hashPassword(password)

        const user = await User.create({name,email,password:hashedPassword})

        return res.json(user)

    } catch (error){
        console.log(error)
    }
}

//Login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if email exist
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }

        //Check password match
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.json({
                error: 'Password is incorrect'
            })
        } else {
            jwt.sign({email: user.email, id: user._id, name:user.name},process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }

    } catch (error) {
        console.log(error)
        
    }
}

const getProfile = async (req, res) => {

    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET, {}, (err, user) =>{
            if(err)throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }

}

module.exports={
    test,
    registerUser,
    loginUser,
    getProfile
}