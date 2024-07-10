const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log(req.headers)
  let response = {}
    try {
      if (!req.headers.authorization) {
        throw new Error('Token is missing from header')
      }
  
      const token = req.headers.authorization.split('Bearer')[1].trim()
      const decodedToken = jwt.verify(
        token,
        'RANDOM_TOKEN_SECRET'
      )
      const userId = decodedToken.userId;
      req.auth = {
        userId: userId
      }; 

     response.status = 200
     response.message = 'Successfully got user profile data'
     return next()

    } catch (error) {
      console.error('Error in auth', error)
      response.status = 401
      response.message = error.message
    }

    return res.status(response.status).send(response)
  }



