export default (sequelize, DataTypes) => {
    class Secret extends sequelize.Model {}
    Secret.init(
        {
            secret_id: { type: DataTypes.UUIDV4, primaryKey: true },
            secret: { type: DataTypes.STRING },
            name: { type: DataTypes.STRING }
        },
        {
        modelName: 'secret',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        version: true,
        }
    )
    return Secret;
    }
