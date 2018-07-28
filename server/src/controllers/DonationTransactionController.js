const {
    DonationTransaction,
    User,
    Account
  } = require('../models')
const _ = require('lodash')
const Op = require('sequelize').Op;
  
  module.exports = {
    async index(req, res) {
      try {
        const { id, level } = req.user
        const donation = await DonationTransaction.findOne({
          where: {
            UserId: id,
            level: level
          }
        })

        if (!donation) {
          res.json(results)
          return false
        }

        const candidate = await User.findOne({
          where: {
            id: donation.candidateId,
            status: 1,
            eligible: true
          }
        })

        if (!candidate) {
          return res.status(404).send({
            error: 'The user account associated with your donation candidate might have been removed or suspended.'
          })
        }
        const candidateAccount = await Account.findOne({
          where: {
            UserId: candidate.id
          }
        })

        const candidateJson = candidate.toJSON()
        candidateJson['account'] = candidateAccount
        const donationJson = donation.toJSON()
        donationJson['candidate'] = candidateJson
                          
        res.json(donationJson)
      } catch (err) {
        res.status(500).send({
          err,
          error: 'an error has occured trying to fetch relevant donation candidate'
        })
      }
    },
    async post (req, res) {
      try {
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
  
async function getHistory(UserId) {
  try {
    const donations = await DonationTransaction.findAll({
      where: {
        UserId,
        payment_status: {
          [Op.or]: 3 // Paid
        }
      },
      attributes: ['candidateId'],
      limit: 5
    })
    console.log('donations-->', donations)
    let candidateIds = []
    donations.forEach(async (element) => candidateIds.push(element.dataValues.candidateId))

    const candidates = await User.findAll({
      where: {
        id: {
          [Op.in]: candidateIds
        }
      },
      include: [
        {
          model: DonationTransaction
        }
      ]
    })
    console.log('candidates-->', candidates)
    return donations
  } catch (err) {
      console.log('err-->', err)
    }
}
  
async function mapHistoryResponse(UserId) {
  getHistory(UserId)
}