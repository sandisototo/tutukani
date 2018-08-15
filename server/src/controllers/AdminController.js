const {
    User,
    Account,
    DonationTransaction,
    Admin
  } = require('../models')
const _ = require('lodash')
const Op = require('sequelize').Op;
const { validationResult } = require('express-validator/check')

module.exports = {
    async index(req, res) {
      try {
        const admins = await Admin.findAll({
          attributes:{
            exclude:[
              "password"
            ]
          }
        })
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
        await Admin.create(body)
        res.json({'status':true, 'body':req.body })
      } catch (err) {
        console.log('err--->', err)
        res.status(400).send({
          error: 'an error has occured trying to add this admin record'
        })
      }
    },
    async donations(req, res){ 
       const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).json({ 'status': false, errors: errors.mapped() });
      }
       try {
        
        let transactions = await DonationTransaction.findAll({
          where:{
            payment_status: 2,
            level:req.body.level
          },
           include: [
          {
              model: User,
              attributes:{
                exclude:[
                  "password"
                ],
                
              }
          },{
            model:User,
            as:'Candidate',
            attributes:{
                exclude:[
                  "password"
                ],
                
              }
          }
          ],
        })
        let new_trans = []
        for(let i = 0; i < transactions.length; i++){
              let user = transactions[i].User.toJSON()
             let candidate = transactions[i].Candidate.toJSON()
              transactions[i].User = user
              new_trans.push({
                  'id':transactions[i].id,
                  'amount':transactions[i].amount,
                  'level':transactions[i].level,
                  'complete_status':transactions[i].payment_status,
                  'candidateId':transactions[i].candidateId,
                  'Userid':transactions[i].UserId,
                  'User':{
                    'id':user.id,
                    'name':user.name,
                    'surname':user.surname,
                    'cell_number':user.cell_number,
                    'Candidate':{
                        'id':candidate.id,
                        'name':candidate.name,
                        'surname':candidate.surname,
                        'cell_number':candidate.cell_number
                    }
                  }
              })
          }  
          res.json({'status':true, 'donations':new_trans})
        
      } catch (err) {
          res.status(500).send({
          error: 'an error has occured trying to fetch admins for this level'
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
  