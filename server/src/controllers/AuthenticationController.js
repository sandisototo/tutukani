const { User,Admin,Referee } = require('../models')
const { Account } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { check, validationResult } = require('express-validator/check');
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
 
module.exports = {
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ 'status': false, errors: errors.mapped() });
    }
    try {
      const { body } = req
      const user = await User.create(body)
        .then(async (newUser) => {
          const account = await newUser.createAccount(body.account)
          const userJson = newUser.toJSON()
          userJson['Account'] = account
          if(typeof body.cell_number != 'undefined'){
              const  refuser = await User.findOne({
                  where: {
                    cell_number:body.cell_number
                  }})
              
             if(refuser){
                 const link = await refuser.createReferee({ new_member_id:userJson['id']})
             }
          }
          return  userJson  
        }).then((newUserAccount) => { 
          res.json({
            user: newUserAccount,
            token: jwtSignUser(newUserAccount)
          })
        })
    } catch (err) {
      console.log('err--->', err)
      const error = (err && err.name == 'SequelizeUniqueConstraintError') ?
        'Your cell number or email has been used to register here before.' :
        'Something went wrong!'
      
      res.status(400).send({
        error
      })
    }
  },
  async login(req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({
        where: {
          username
        },
        include: [
          {
            model: Account
          }
        ]
      })

      console.log('user--->', user)

      if (!user) {
        return res.status(403).send({
          error: 'User not found. Please sign up first.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The password is incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
 async adminlogin(req, res) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ 'status': false, errors: errors.mapped() });
    }
    try {
      const {username, level, password} = req.body
      const user = await Admin.findOne({
        where: {
          username,
          level
        }
      })

      console.log('user--->', user)

      if (!user) {
        return res.status(403).send({
          error: 'User not found. Please sign up first.'
        })
      }

      const isPasswordValid = await Admin.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The password is incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
}
