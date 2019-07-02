const {
    Admin
  } = require('../models')
const _ = require('lodash')
const { validationResult } = require('express-validator/check')

module.exports = {
  async index(req, res) {
    try {
      const admins = await Admin.findAll({
        attributes: {
          exclude: [
            'password'
          ]
        }
      })
      res.json(admins)
    } catch (err) {
        res.status(500).send({
        error: 'an error has occurred trying to fetch admins for this level'
      })
    }
  },
  async post (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ 'status': false, errors: errors.mapped() })
    }
    
    try {
      const { body } = req
      await Admin.create(body)

      res.json(req.body)
    } catch (err) {
      console.log('err--->', err)
      res.status(400).send({
        error: 'an error has occurred trying to add this admin record'
      })
    }
  },
  async put(req, res) {
    try {
      const admin = req.body
      await Admin.update(admin, {
        where: {
          id: admin.id
        }
      })

      res.json(req.body)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to update this admin record'
      })
    }
  },
  async remove(req, res) {
    try {
      const admin = req.body
      await Admin.destroy({
        where: {
          id: admin.id
        }
      })
      res.json(req.body)

    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to remove this admin record'
      })
    }
  }
}
