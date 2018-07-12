const {
    DonationTransaction,
    User,
    Account
  } = require('../models')
const _ = require('lodash')
const Op = require('Sequelize').Op;
  
  module.exports = {
    async index (req, res) {
      try {
        const userId = req.user.id
        const donation = await DonationTransaction.findOne({
          where: {
              UserId: userId,
              payment_status: {
                [Op.or]: [0, 1]
              }
          }
        })
        if (!donation) {
          return res.status(404).send({
            error: 'You have no active donation'
          })
        }
        const candidate = await User.findOne({
          UserId: donation.candidateId,
          status: 1
        })

        if (!candidate) {
          return res.status(404).send({
            error: 'The user account associated with your donation candidate might have been removed or suspended.'
          })
        }
        const candidateAccount = await Account.findOne({
          UserId: candidate.id
        })

        const candidateJson = candidate.toJSON()
        candidateJson['account'] = candidateAccount
        const donationJson = donation.toJSON()
        donationJson['candidate'] = candidateJson 
                  
        res.json(donationJson)
      } catch (err) {
        res.status(500).send({
          error: 'an error has occured trying to fetch relevant donation candidate 2'
        })
      }
    },
    async post (req, res) {
      try {
        const userId = req.user.id
        const {body} = req
        const donation = await DonationTransaction.create(body)
        res.send(donation)
      } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'an error has occured trying to record this transaction'
        })
      }
    },
    async put(req, res) {
      try {
        const donation = req.body
        await DonationTransaction.update(donation, {
          where: {
            id: donation.id
          }
        })
        res.json(req.body)

      } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'an error has occured trying to update this transaction'
        })
      }
    },
    async remove (req, res) {
      try {
        const userId = req.user.id
        const {donationId} = req.params
        const donation = await DonationTransaction.findOne({
          where: {
            id: donationId,
            UserId: userId
          }
        })
        if (!donation) {
          return res.status(403).send({
            error: 'you do not have access to this transaction'
          })
        }
        await donation.destroy()
        res.send(donation)
      } catch (err) {
        res.status(500).send({
          error: 'an error has occured trying to delete the transaction'
        })
      }
    }
  }
  