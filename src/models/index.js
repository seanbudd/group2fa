const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/test_group2fa', {
    logging: false
});

const connect = sequelize.authenticate();

const model = name => database.models[name]; //as typeof Model;

const models = {}

var model_names = [
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
    model
};
