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
            allowNull: true,
            type: DataTypes.STRING,
          },
          account_holder: {
            allowNull: true,
            type: DataTypes.STRING
          },
          account_number: {
            llowNull: false,
            type: DataTypes.STRING,
            unique: true
          },
          account_cell_number: {
            llowNull: false,
            type: DataTypes.STRING,
            unique: true
          },
          branch_code: {
            type: DataTypes.STRING,
            allowNull: true
          }
      },{
      timestamps: true
    })

    Account.associate = function (models) {
        Account.belongsTo(models.User, { onDelete: 'cascade', hooks: true })
    }
  
    return Account
  }
  