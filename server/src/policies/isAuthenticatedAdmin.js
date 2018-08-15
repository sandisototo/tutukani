const jwt = require('jsonwebtoken');
const {User,Admin} = require('../models')
const config = require('../config/config')
module.exports = function (req, res, next) {
  let token = req.headers['authorization'];
   if(typeof token !='undefined'){
      const bearer = token.split(' ')
      const tokenBearer = bearer[1];
      req.token = tokenBearer;
       let SECRET_KEY = config.authentication.jwtSecret
       jwt.verify(tokenBearer, SECRET_KEY, async (err, decoded)=> {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
               
                try {
                  const admin = await Admin.findOne({
                    where: {
                        id: decoded.id
                      }
                  })
                  if (!admin) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                  }
                  req.user = decoded
                  next();
                } catch (err) {
                  return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                }
                
        });
  }else{
    return res.send({ status: false, message: 'No token provided.' });
  }
}