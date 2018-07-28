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
            defaultValue: 0 // 0-started, 1-promised to pay, 2-paid, 3-expired
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1 // level 1
        }
    },
    {
        timestamps: true
    })

    DonationTransaction.associate = function (models) {
        DonationTransaction.belongsTo(models.User)
    }
  
    return DonationTransaction
  }
  