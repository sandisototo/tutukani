const bcrypt = require('bcryptjs')

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
