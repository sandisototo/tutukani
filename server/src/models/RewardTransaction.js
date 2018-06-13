module.exports = (sequelize, DataTypes) => {
    const RewardTransaction = sequelize.define('RewardTransaction',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          amount: DataTypes.DOUBLE
    })

    RewardTransaction.associate = function (models) {
        RewardTransaction.belongsTo(models.User)
    }
  
    return RewardTransaction
  }
  