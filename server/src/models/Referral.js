module.exports = (sequelize, DataTypes) => {
  const Referral = sequelize.define('Referral',
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      newMemberId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
      },
    { timestamps: true }
  )
  
  Referral.associate = function (models) {
    Referral.belongsTo(models.User)
  }
  
    return Referral
  }
  