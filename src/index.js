const Config = require('config')
const Hapi = require('hapi')
const Controllers = require('./controllers')
const Swagger = require('./swagger')

const server = Hapi.server({
    port: Config.get('General.port'),
    host: '0.0.0.0',
    routes: Config.get('General.cors') ? {
        cors: {
            origin: ['*'],
        },
    } : {},
})

const start = async () => {

    if (process.env.NODE_ENV !== 'production') {
        await Swagger(server)
    }

    server.route(Controllers())

    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}

start();

