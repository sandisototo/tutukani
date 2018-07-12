module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          bank: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          account_type: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          account_holder: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          account_number: {
            llowNull: false,
            type: DataTypes.STRING,
            unique: true
          },
          branch_code: {
            type: DataTypes.STRING,
          }
    })

    Account.associate = function (models) {
        Account.belongsTo(models.User)
    }
  
    return Account
  }
  