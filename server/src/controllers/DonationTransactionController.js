const {
  DonationTransaction,
  User,
  Account,
  Level
} = require('../models')
const { validationResult } = require('express-validator/check')
const _ = require('lodash')
const Op = require('sequelize').Op

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
        res.json(donation)
        return false
      }
      
      const candidate = await User.findOne({
        where: {
          id: donation.CandidateId,
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
      console.log('err--->', err)
      res.status(500).send({
        err,
        error: 'an error has occurred trying to fetch relevant donation candidate'
      })
    }
  },
  async getDonationCount(req, res) {
    const { level, CandidateId } = req.params
    try {
      const count = await DonationTransaction.count({
        where: {
          CandidateId: CandidateId,
          level: level
        }
      })

      res.json(count)
    } catch (err) {
      console.log('err -->', err)
      res.status(500).send({
        error: 'an error has occurred trying to get the count'
      })
    }
  },
  async getCandidateByLevel(req, res) {
    // Make sure to have update a user (level and hasPaidBefore) before hitting this
    const { id, level } = req.user
    try {
      const candidate = await User.findOne({
        where: {
          id: {
            [Op.ne]: id
          },
          level,
          // hasPaidBefore: 1,
          eligible: true,
          needsDonors: true
        },
        include: [{
          model: Account
        },
        {
          model: Level
        }]
      })

      res.json(candidate)
    } catch (err) {
      console.log('err -->', err)
      res.status(500).send({
        error: 'an error has occurred trying to getDonationCandidateByLevel'
      })
    }
  },
  async createDonationTransactionByLevel(req, res) {
    try {
      const { body } = req
      /*
        body: {
        UserId: 1,
        CandidateId,
        level: 2,
        amount: 120
        }
      */
      const donation = await DonationTransaction.create(body)
      res.send(donation)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to record this transaction'
      })
    }
  },
  async post(req, res) {
    try {
      const { body } = req
      const donation = await DonationTransaction.create(body)
      res.send(donation)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to record this transaction'
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
        error: 'an error has occurred trying to update this transaction'
      })
    }
  },
  async remove(req, res) {
    try {
      const userId = req.user.id
      const { donationId } = req.params
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
        error: 'an error has occurred trying to delete the transaction'
      })
    }
  },
  async getCompletedDonationsByLevel(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ 'status': false, errors: errors.mapped() });
    }

    try {
      let { level } = req.params
      let transactions = await DonationTransaction.findAll({
        where:{
          payment_status: 2,
          level
        },
        include: [
        {
          model: User,
          attributes: {
            exclude: [
              'password'
            ]
          }
        },
        {
          model:User,
          as:'Candidate',
          attributes:{
            exclude:[
              'password'
            ] 
          }
        }
      ]
    })

    res.json(transactions) 
    } catch (err) {
        console.log('err-->', err)
        res.status(500).send({
        error: 'an error has occurred trying to fetch transactions for this level'
      })
    }
  },
  async getActiveDonationsByLevel(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(403).json({ 'status': false, errors: errors.mapped() })
    }

    try {
      let { level } = req.params
      let transactions = await DonationTransaction.findAll({
        where:{
          level
        },
        include: [
        {
          model: User,
          attributes:{
            exclude:[
              'password'
            ]
          }
        },
        {
          model:User,
          as:'Candidate',
          attributes:{
            exclude:[
              'password'
            ] 
          }
        }
      ]
    })

    res.json(transactions) 
    } catch (err) {
      console.log('err-->', err)
        res.status(500).send({
        error: 'an error has occurred trying to fetch active transactions for this level'
      })
    }
  }
}

