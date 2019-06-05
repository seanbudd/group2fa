export default (sequelize, DataTypes) => {
    class User extends sequelize.Model {}
    User.init(
        {
            user_id: { type: DataTypes.UUIDV4, primaryKey: true },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING }
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

  return User;
};
