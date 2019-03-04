const BannerTemplate = require('../../templates/banner')
const UUID = require('uuid/v4')
const Joi = require('joi')
const DB = require('../../db')

const lastModified = new Date().toUTCString()
const etag = UUID()

const iframeAction = async (request, h) => {

    try {

        const { id, x, y } = request.query

        const project = DB.get('projects')
            .find({ id: id })
            .value()

        if (!project) {
            throw new Error('Project not found')
        }

        const url = `${request.url.protocol}//${request.info.host}`

        return h.response(BannerTemplate(url, id, project, x, y))
            .header('Content-Type', 'text/html')
            .header('Last-Modified', lastModified)
            .etag(etag);
    }

    catch (e) {
        console.error('banner:ad:iframeAction', e)
        return `errorForBanner`
    }
}

module.exports = [
    {
        method: 'get',
        path: '/iframe.html',
        config: {
            handler: iframeAction,
            validate: {
                query: {
                    id: Joi.number().required(),
                    x: Joi.number().required(),
                    y: Joi.number().required(),
                },
            },
            description: 'Banner code for client application',
            tags: ['banner', 'script'],
        },
    },
]
