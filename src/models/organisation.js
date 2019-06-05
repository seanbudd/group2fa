export default (sequelize, DataTypes) => {
    class Organisation extends sequelize.Model {}
    Organisation.init(
        {
            organisation_id: { type: DataTypes.UUIDV4, primaryKey: true },
            name: { type: DataTypes.STRING }
        },
        {
        modelName: 'organisation',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        version: true,
        sequelize
        }
    )

  return Organisation;
};
