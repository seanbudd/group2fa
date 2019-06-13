const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false
});

const connect = sequelize.authenticate();

const models = {}

const model_names = [
    'organisation_secret',
    'organisation',
    'secret',
    'user_secret',
    'user_organisation',
    'user'
];

model_names.forEach(model_name => models[model_name] = sequelize.import(model_name))// as {[key: string]: any});

models['user_secret'].belongsTo(models['user']);
models['user_secret'].belongsTo(models['secret']);
models['user_organisation'].belongsTo(models['user']);
models['user_organisation'].belongsTo(models['organisation']);
models['organisation_secret'].belongsTo(models['organisation']);
models['organisation_secret'].belongsTo(models['secret']);
// TODO continue

module.exports = {
    sequelize,
    models,
    connect,
    model: name => models[name]
};
