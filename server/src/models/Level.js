module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define('Level',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_donors: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      amount: DataTypes.DOUBLE
    },
    {   
      timestamps: true
    })
    Level.associate = function (models) {
      Level.belongsToMany(models.User, { foreignKey: 'type', through: 'level' })
    }
    return Level
  }
  