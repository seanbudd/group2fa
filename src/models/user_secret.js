const Model = require('sequelize').Model;
const TOTP = require('@akanass/rx-otp').TOTP;
const crypto = require('crypto');

module.exports =  (sequelize, DataTypes) => {
    class UserSecret extends Model {}
    UserSecret.init(
      {
        consumer_2fa_secret: { 
          type: DataTypes.STRING, 
          allowNull: false,
          defaultValue: () => crypto.randomBytes(16).toString('hex'),
          get: () => null,
        }
      },
      {
      modelName: 'user_secret',
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      version: true,
      underscored: true,
      verify: (mfa_token, success_callback) => 
          TOTP.verify(mfa_token, this.getDataValue('user_secret')).subscribe(success_callback),
      sequelize
      }
    )
  return UserSecret;
};
