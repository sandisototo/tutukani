const { hashPassword } = require('./../helpers')

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          username: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          password: {
            allowNull: false,
            type: DataTypes.STRING,
          }
        },
        {   
            hooks: {
              beforeCreate: hashPassword,
              beforeUpdate: hashPassword,
              beforeSave: hashPassword
            }
        })

    Admin.associate = function (models) {}
  
    return Admin
  }
  