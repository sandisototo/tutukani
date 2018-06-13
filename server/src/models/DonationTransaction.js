module.exports = (sequelize, DataTypes) => {
    const DonationTransaction = sequelize.define('DonationTransaction',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          amount: DataTypes.DOUBLE
    })

    DonationTransaction.associate = function (models) {
        DonationTransaction.belongsTo(models.User)
    }
  
    return DonationTransaction
  }
  