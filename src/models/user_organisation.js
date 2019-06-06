const Model = require('sequelize').Model;

module.exports =  (sequelize, DataTypes) => {
    class UserOrganisation extends Model {}
    UserOrganisation.init({},
        {
        modelName: 'user_organisation',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        version: true,
        underscored: true,
        sequelize
        }
    )
  return UserOrganisation;
};
