const bcrypt = require('bcryptjs')

const { hashPassword } = require('./../helpers')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cell_number: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    gender: DataTypes.STRING,
    refferal_number: {
      allowNull: true,
      type: DataTypes.STRING
    },
    username: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    address: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasPaidBefore: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    needsDonors: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    province: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },
  {
    hooks: {
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    },
    timestamps: true
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  User.associate = function (models) {
    User.hasOne(models.Account)
    User.belongsTo(models.Level, { foreignKey: 'level' })
  }

  return User
}
