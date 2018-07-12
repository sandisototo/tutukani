const {
    RewardTransaction,
    User,
    Account
  } = require('../models')
  const _ = require('lodash')
  
  module.exports = {
    async index (req, res) {
      try {
        const userId = req.user.id
        const rewards = await RewardTransaction.findAll({
          where: {
              UserId: userId,
              payment_status: 3,
              complete_status: 2
          }
        })
        
        res.json(rewards)
      } catch (err) {
        res.status(500).send({
          error: 'an error has occured trying to fetch your rewards'
        })
      }
    },
    async post(req, res) {
      res.status(500).send({
        error: 'Sorry handler not yet implemented'
      })
     },
    async put(req, res) {
      res.status(500).send({
        error: 'Sorry handler not yet implemented'
      })
     },
    async remove(req, res) {
      res.status(500).send({
        error: 'Sorry handler not yet implemented'
      })
    }
  }
  