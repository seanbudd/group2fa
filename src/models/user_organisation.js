
export default (sequelize, DataTypes) => {
    class UserOrganisation extends sequelize.Model {}
    UserOrganisation.init({},
        {
        modelName: 'user_organisation',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        version: true,
        sequelize
        }
    )
  return UserOrganisation;
};
