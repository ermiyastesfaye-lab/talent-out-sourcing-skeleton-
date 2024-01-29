const jwt = require('jsonwebtoken')

const requireEmpAuth = (req, res, next) => {
    
    console.log('token aquired')

    const token = req.cookies.jwt
    
    //check if the token exists and verified
    if (token){
        jwt.verify(token, 'mysecret', (err, decodedToken) => {
            //verify token
            if(err){
                console.log(err)
                res.redirect('/employer-auth/employerLogIn')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/employer-auth/employerLogIn')
    }
}

module.exports = {requireEmpAuth}