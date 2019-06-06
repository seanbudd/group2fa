const Model = require('sequelize').Model;
module.exports =  (sequelize, DataTypes) => {
    class OrganisationSecret extends Model {}
    OrganisationSecret.init({},
        {
        modelName: 'organisation_secret',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        version: true,
        underscored: true,
        sequelize,
        }
    )
    return OrganisationSecret;
    }
