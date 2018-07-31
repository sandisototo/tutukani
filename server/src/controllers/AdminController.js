const {
    User,
    Account,
    Admin
  } = require('../models')
const _ = require('lodash')
const Op = require('Sequelize').Op;
const { check, validationResult } = require('express-validator/check')

module.exports = {
    async index(req, res) {
      const searchLevel = req.params.level
      try {
        const admins = await Admin.findAll()

        res.json(admins)
      } catch (err) {
          res.status(500).send({
          error: 'an error has occured trying to fetch admins for this level'
        })
      }
    },
    async post (req, res) {
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).json({ 'status': false, errors: errors.mapped() });
      }
      
      try {
        const { body } = req
        const user = await Admin.create(body)
        res.json(req.body)
      } catch (err) {
        console.log('err--->', err)
        res.status(400).send({
          error: 'an error has occured trying to add this admin record'
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
          error: 'an error has occured trying to update this admin record'
        })
      }
    },
    async remove (req, res) {
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
          error: 'an error has occured trying to remove this admin record'
        })
      }
    }
  }
  