const jwt = require('jsonwebtoken')

const requireStudAuth = (req, res, next) => {
    
    console.log('token aquired')

    const token = req.cookies.jwt
    
    //check if the token exists and verified
    if (token){
        jwt.verify(token, 'mysecret', (err, decodedToken) => {
            //verify token
            if(err){
                console.log(err)
                res.redirect('/student-auth/studentLogIn')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/student-auth/studentLogIn')
    }
}

module.exports = {requireStudAuth}