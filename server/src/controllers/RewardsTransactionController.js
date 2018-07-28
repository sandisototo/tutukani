const {
  DonationTransaction,
    User,
    Account
  } = require('../models')
  const _ = require('lodash')
  
  module.exports = {
    async index (req, res) {
      try {
        const { id, level } = req.user
        let attributes = [
          'id',
          'name',
          'surname',
          'cell_number'
        ]

        const rewards = await DonationTransaction.findAll({
          where: {
            candidateId: id,
            level
          },
          include: [{
            model: User, 
            attributes,
            where: {
              id: [DonationTransaction.sequelize.literal('DonationTransaction.UserId')]
            }
          }],
          order: [['createdAt', 'DESC']],
          limit: 2,
        })

        res.json(rewards)
      } catch (err) {
        console.log('err-->', err )
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
  