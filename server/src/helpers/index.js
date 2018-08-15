const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const { User } = require('../models')
module.exports = {
async  hashPassword (user, options) {
    const SALT_FACTOR = 8
  
    if (!user.changed('password')) {
      return
    }

    const genSalt = await bcrypt.genSalt(SALT_FACTOR)
    const hash = await bcrypt.hash(user.password, genSalt)
    user.setDataValue('password', hash)
  }
} 

global.validate_singup =[
    check('name')
    .exists().withMessage('name field is required'),
    check('surname')
    .exists().withMessage('Surname field is required'),
    check('password')
    .exists().withMessage('passwords field is required'),
  	check('cell_number')
    .exists().withMessage('cell number field is required'),
]
global.validate_admin_singup =[
    check('name')
    .exists().withMessage('name field is required'),
      check('level')
    .exists().withMessage('level field is required'),
    check('username')
    .exists().withMessage('Surname field is required'),
    check('province')
    .exists().withMessage('Province field is required'),
    check('password')
    .exists().withMessage('passwords field is required'),
]
global.validate_admin_login =[
    check('username')
    .exists().withMessage('Surname field is required'),
    check('level')
    .exists().withMessage('level field is required'),
    check('password')
    .exists().withMessage('passwords field is required'),
]