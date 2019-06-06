const Model = require('sequelize').Model;
module.exports = (sequelize, DataTypes) => {
    class Secret extends Model {}
    Secret.init(
        {
            secret_id: { 
                type: DataTypes.UUID, 
                primaryKey: true, 
                allowNull: false,
                defaultValue: DataTypes.UUIDV4 
            },
            secret: { 
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {                 
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
        modelName: 'secret',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        version: true,
        sequelize
        }
    )
    return Secret;
    }
