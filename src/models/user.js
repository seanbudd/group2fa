const Model = require('sequelize').Model;
const bcrypt = require('bcrypt')

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
                allowNull: false,
                get: () => null,
                set: (raw_password) => bcrypt.hash(raw_password, 10, (err, hash) => this.setDataValue('password', hash))
            },
        },
        {
        modelName: 'user',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        version: true,
        isPassword: (raw_password, callback) => bcrypt.compare(raw_password, this.getDataValue('password'), callback),
        sequelize
        }
    )

  return User;
};
