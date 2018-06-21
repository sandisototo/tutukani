module.exports = (sequelize, DataTypes) => {
    const DonationTransaction = sequelize.define('DonationTransaction',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: DataTypes.DOUBLE,
        candidateId: DataTypes.INTEGER,
        payment_status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        complete_status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    DonationTransaction.associate = function (models) {
        DonationTransaction.belongsTo(models.User)
    }
  
    return DonationTransaction
  }
  