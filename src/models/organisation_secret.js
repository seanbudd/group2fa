

export default (sequelize, DataTypes) => {
    class OrganisationSecret extends sequelize.Model {}
    OrganisationSecret.init({},
        {
        modelName: 'organisation_secret',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        version: true,
        sequelize,
        }
    )
    return OrganisationSecret;
    }
