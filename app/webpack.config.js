'use strict'

const webpackConfigs = require('./config')
const defaultConfig = 'dev'

module.exports = configName => {
    const requestedConfig = configName || defaultConfig

    let LoadedConfig = defaultConfig

    if (webpackConfigs[requestedConfig] !== undefined) {
        LoadedConfig = webpackConfigs[requestedConfig]
    } else {
        console.warn(`
      Provided environment "${configName}" was not found.
      Please use one of the following ones:
      ${Object.keys(webpackConfigs).join(' ')}
    `)
        LoadedConfig = webpackConfigs[defaultConfig]
    }

    const loadedInstance = new LoadedConfig()

    process.env.NODE_ENV = loadedInstance.env

    return loadedInstance.config
}
