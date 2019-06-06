const Model = require('sequelize').Model;
module.exports =  (sequelize, DataTypes) => {
    class Organisation extends Model {}
    Organisation.init(
        {
            organisation_id: { 
                type: DataTypes.UUID, 
                primaryKey: true, 
                allowNull: false,
                defaultValue: DataTypes.UUIDV4 
            },
            name: { 
                type: DataTypes.STRING,
                allowNull: false
            }
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
