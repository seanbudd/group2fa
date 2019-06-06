const Model = require('sequelize').Model;

module.exports =  (sequelize, DataTypes) => {
    class UserSecret extends Model {}
    UserSecret.init(
      {
        consumer_2fa_secret: { 
          type: DataTypes.STRING, 
          allowNull: false 
        }
      },
      {
      modelName: 'user_secret',
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      version: true,
      underscored: true,
      sequelize
      }
    )
  return UserSecret;
};
