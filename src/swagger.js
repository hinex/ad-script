const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Package = require('../package.json')

module.exports = async (server) => {

    const swaggerOptions = {
        info: {
            title: Package.name,
            version: Package.version,
        },
    }

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ])
}
