const { User } = require('../models')
const { Account } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try {
      const { body } = req
      const user = await User.create(body)
        .then(async (newUser) => {
          const account = await newUser.createAccount(body.account)
          const userJson = newUser.toJSON()
          userJson['Account'] = account
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
  }
}
