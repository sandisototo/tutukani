module.exports = (sequelize, DataTypes) => {
    const Referee = sequelize.define('Referee',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          new_member_id: {
           allowNull: false,
           type: DataTypes.INTEGER,
         },
        },
        {   
          timestamps: true
        })
   
    Referee.associate = function (models) {
       Referee.belongsTo(models.User)
    }
  
    return Referee
  }
  