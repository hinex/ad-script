const Config = require('config')
const Hapi = require('hapi')
const Path = require('path')
const Controllers = require('./controllers')
const Swagger = require('./swagger')

const files = {
    relativeTo: Path.join(__dirname, '../static')
}

const cors = {
    origin: ['*'],
}

const server = Hapi.server({
    port: Config.get('General.port'),
    host: '0.0.0.0',
    routes: Config.get('General.cors') ? { cors, files } : { files },
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

