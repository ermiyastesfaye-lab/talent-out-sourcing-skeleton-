const student = require('../models/studentModel')
const jwt = require('jsonwebtoken')


//error handler
const handleErrors = (err)=>{
    console.log(err.message, err.code)
    if (err.code === 11000){
        const duplicatedValue = err.keyValue.email
        console.log(`${duplicatedValue} is already regestered`)
    }
}

//creating token
const maxAge = 3*24*60*60
const createToken = (id) => {
    return jwt.sign({id}, 'mysecret', {expiresIn:maxAge})
}

//get form for user sign up  
exports.signUpForm = (req, res) => {
    res.render('StudentSignUp')
}

//sign up student
exports.SignUp = async (req, res) => {
    const {name, email, password} = req.body
    console.log ({name, email, password})
    try{
        const Student = await student.create({name, email, password})
        const token = createToken(Student._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge*1000})
        res.redirect('/students')
    }
    catch (err) {
        handleErrors(err)
        res.status(400).send('error, user not created')
    }
}

//get form for employer login
exports.LogInForm = (req, res) => {
    res.render('StudentLogIn')
}

//log in student
exports.logIn= async (req,res) => {
   const {email, password} = req.body
   console.log({email, password}) 

   try{
    const Student = await student.login(email, password)
    if(Student){
        console.log('true')
    } else {
        console.log('false')
    }
    
    const token = createToken(Student._id)
    res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge*1000})
    res.redirect('/students')
   }catch (err){
    console.error('login failed: ', err)
    res.status(400).json({})
   }
}

// log out student
exports.logOut = (req, res) => {
    res.cookie('jwt', '', {maxAge:1})
    res.redirect('/')
}