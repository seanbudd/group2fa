const Model = require('sequelize').Model
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        get: () => null,
        set: function (raw_password) {
          const hash = bcrypt.hashSync(raw_password, 10)
          this.setDataValue('password', hash)
        }
      }
    },
    {
      modelName: 'user',
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      version: true,
      sequelize
    }
  )
  User.prototype.isPassword = function (raw_password) {
    return bcrypt.compareSync(raw_password, this.getDataValue('password'))
  }
  return User
}
