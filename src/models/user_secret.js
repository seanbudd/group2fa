
export default (sequelize, DataTypes) => {
    class UserSecret extends sequelize.Model {}
    UserSecret.init(    {
        consumer_2fa_secret: { type: DataTypes.STRING }
    },
    {
    modelName: 'user_secret',
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    version: true,
    }
    )
  return UserSecret;
};
