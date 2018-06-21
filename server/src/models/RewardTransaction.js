module.exports = (sequelize, DataTypes) => {
    const RewardTransaction = sequelize.define('RewardTransaction',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: DataTypes.DOUBLE,
        payerId: DataTypes.INTEGER,
        payment_status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        complete_status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    RewardTransaction.associate = function (models) {
        RewardTransaction.belongsTo(models.User)
    }
  
    return RewardTransaction
  }
  