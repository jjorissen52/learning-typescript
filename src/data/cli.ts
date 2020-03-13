#!/usr/bin/env ts-node
import { userDataPrompt, ModelType, selectModel } from "./dataPrompts"
import models from "./models"

require('yargs') // eslint-disable-line
  .command('create [model_name]', 'create an instance of [model_name]', (yargs) => {
    yargs
      .positional('model_name', {
        describe: 'type of model to create',
        default: "User"
      })
  }, (argv) => {
    let modelType: ModelType|null = selectModel(argv.model_name)
    if (modelType) {
      return userDataPrompt(modelType)
    }
    console.error(`${argv.model_name} did not match any known models.`)
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .argv