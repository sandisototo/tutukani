const {
  User,
  Account
} = require('../models')
const _ = require('lodash')
const Op = require('sequelize').Op;

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
      res.status(500).send({
        error: 'an error has occurred trying to fetch users for this level'
      })
    }
  },
  async getByNumber(req, res) {
    const { level, cell_number } = req.params
    try {
      const user = await User.findOne({
        where: {
          level,
          cell_number,
          status: 1
        },
        include: [
          {
            model: Account
          }
        ]
      })

      res.json(user)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to fetch user for the provided id and level'
      })
    }
  },
  async toDonate(req, res) {
    const searchLevel = req.params.level
    try {
      const users = await User.findAll({
        where: {
          level: searchLevel,
          status: 1,
          eligible: 1,
          hasPaidBefore: 0
        },
        include: [
          {
            model: Account
          }
        ]
      })

      res.json(users)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occurred trying to fetch users for this level'
      })
    }
  },
  async post(req, res) {
    res.status(500).send({
      error: 'not yet implemented!'
    })
  },
  async linkUser(req, res) {
    try {
      const ref = req.body
      const user = await User.findOne({
        where: {
          cell_number: ref.cell_number
        }
      })
      if (user) {
        const link = await user.createReferral({ new_member_id: req.user.id })
        res.json(req.body)
      } else {
        res.status(500).send({
          error: 'user not found with the provided cell number'
        })
      }


    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to link this user record'
      })
    }
  },
  async put(req, res) {
    try {
      const user = req.body
      await User.update(user, {
        where: {
          id: user.id
        }
      })
      if (user && user.Account) {
        await Account.update(user.Account, {
          where: {
            UserId: user.id
          }
        })
      }

      res.json(req.body)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to update this user record'
      })
    }
  },
  async remove(req, res) {
    res.status(500).send({
      error: 'not yet implemented!'
    })
  }
}
