const Model = require('sequelize').Model;

module.exports =  (sequelize, DataTypes) => {
    class User extends Model {}
    User.init(
        {
            user_id: { 
                type: DataTypes.UUID, 
                primaryKey: true, 
                allowNull: false,
                defaultValue: DataTypes.UUIDV4 
            },
            email: { 
                type: DataTypes.STRING, 
                unique: true,
                allowNull: false 
            },
            password: { 
                type: DataTypes.STRING, 
                allowNull: false 
            }
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
