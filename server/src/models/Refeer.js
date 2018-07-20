module.exports = (sequelize, DataTypes) => {
    const Refeer = sequelize.define('Refeer',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          userid: {
           allowNull: false,
           type: DataTypes.INTEGER,
          },
           refeer_userid: {
           allowNull: false,
           type: DataTypes.INTEGER,
         },
        },
        {   
          timestamps: true
        })
   
    Refeer.associate = function (models) {}
  
    return Refeer
  }
  