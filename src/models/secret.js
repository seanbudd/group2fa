const TOTP = require('@akanass/rx-otp').TOTP

const Model = require('sequelize').Model
module.exports = (sequelize, DataTypes) => {
  class Secret extends Model {}
  Secret.init(
    {
      secret_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      secret: {
        type: DataTypes.STRING,
        allowNull: false,
        get: () => null
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      secure: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      modelName: 'secret',
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      version: true,
      sequelize
    }
  )
  Secret.prototype._unsafeGetTOTP = function (success_callback) {
    TOTP.generate(this.getDataValue('secret')).subscribe(success_callback)
  }
  Secret.prototype.getTOTP = function (
    success_callback,
    mfa_token,
    user_secret
  ) {
    this.getDataValue('secure')
      ? user_secret.verify(mfa_token, this._unsafeGetTOTP(success_callback))
      : this._unsafeGetTOTP(success_callback)
  }
  return Secret
}
