exports: {
  hashPassword = (user, options) => {
    const SALT_FACTOR = 8
  
    if (!user.changed('password')) {
      return
    }
  
    return bcrypt
      .genSaltAsync(SALT_FACTOR)
      .then(salt => bcrypt.hashAsync(user.password, salt, null))
      .then(hash => {
        user.setDataValue('password', hash)
      })
}
} 
