/* eslint-disable import/first */
import pg from 'pg';

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/test_group2fa');

const connect = async () => await sequelize.authenticate();

const model = name => database.models[name]; //as typeof Model;

const models = ['user_secret', 'user_organisation', 'user']
.reduce((model_dir, model_name) => model_dir[model_name] = sequelize.import('./models/' + model_name), {})// as {[key: string]: any});


models['user_secret'].belongsTo(models['user'], );
models['user_secret'].belongsTo(models['secret']);
models['user_organisation'].belongsTo(models['user']);
models['user_organisation'].belongsTo(models['organisation']);
// TODO continue

const database = {
    sequelize,
    models,
    connect,
    model
};

export default database;
