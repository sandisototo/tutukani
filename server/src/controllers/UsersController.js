const {
    User,
    Account
  } = require('../models')
const _ = require('lodash')
const Op = require('Sequelize').Op;
  
  module.exports = {
    async index(req, res) {
      const searchLevel = req.params.level
      try {
        const users = await User.findAll({
            where: {
              level: searchLevel,
              status: 1
            },
            include: [
            {
              model: Account
            }
          ]
        })

        res.json(users)
      } catch (err) {
          console.log('err-->', err)
          res.status(500).send({
          error: 'an error has occured trying to fetch users for this level'
        })
      }
    },
    async post (req, res) {
        res.status(500).send({
            error: 'not yet implemented!'
        })
    },
    async put(req, res) {
        res.status(500).send({
            error: 'not yet implemented!'
        })
    },
    async remove (req, res) {
        res.status(500).send({
            error: 'not yet implemented!'
        })
    }
  }
  