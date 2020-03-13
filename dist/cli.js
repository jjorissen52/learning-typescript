#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataPrompts_1 = require("./dataPrompts");
const models_1 = require("./models");
require('yargs') // eslint-disable-line
    .command('create [model_name]', 'create an instance of [model_name]', (yargs) => {
    yargs
        .positional('model_name', {
        describe: 'type of model to create',
        default: "User"
    });
}, (argv) => {
    let modelType = dataPrompts_1.selectModel(argv.model_name);
    if (modelType) {
        return dataPrompts_1.userDataPrompt(modelType);
    }
    console.error(`${argv.model_name} did not match any known models.`);
})
    .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
})
    .command('sync', 'sync the current models with the database', (yargs) => {
    yargs;
}, (argv) => {
    models_1.default.sequelize.sync();
})
    .argv;
//# sourceMappingURL=cli.js.map