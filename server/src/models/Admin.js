const { hashPassword } = require('./../helpers')

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
          allowNull: false,
          type: DataTypes.STRING,
         },
          username: {
            allowNull: false,
            type: DataTypes.STRING,
          },
           level: {
            type: DataTypes.INTEGER,
            defaultValue: 1
          },
          password: {
            allowNull: false,
            type: DataTypes.STRING, 
          },
          province: {
            allowNull: false,
            type: DataTypes.STRING,
          }
        },
        {   
            hooks: {
              beforeCreate: hashPassword,
              beforeUpdate: hashPassword,
              beforeSave: hashPassword
          },
          timestamps: true
        })
    Admin.prototype.comparePassword = function (password) {
      return bcrypt.compare(password, this.password)
    }
    Admin.associate = function (models) {}
  
    return Admin
  }
  