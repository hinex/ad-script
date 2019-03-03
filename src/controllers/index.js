const Path = require('path')
const Fs = require('fs')

let routes = []

const processRoute = (name) => {

    const controller = require(name)

    if (Array.isArray(controller)){
        routes = routes.concat(controller)
        return
    }

    routes.push(controller)
}

const getFiles = (directory) => {

    const dir = directory || __dirname
    const files = Fs.readdirSync(dir)

    for (const i in files) {
        if (!files.hasOwnProperty(i)) {
            continue
        }

        const name = Path.resolve(dir, files[i])

        if (name === __filename) {
            continue
        }

        if (Fs.statSync(name).isDirectory()) {
            getFiles(name)
            continue
        }

        processRoute(name)
    }

    return routes
}

module.exports = getFiles
