const CodeTemplate = require('../../templates/code')
const UUID = require('uuid/v4')
const Joi = require('joi')
const DB = require('../../db')

const lastModified = new Date().toUTCString()
const etag = UUID()

const codeAction = async (request, h) => {

    try {

        const { id, x, y } = request.query

        const url = `${request.url.protocol}//${request.info.host}`

        return h.response(CodeTemplate(url, id, x, y))
            .header('Content-Type', 'application/javascript')
            .header('Last-Modified', lastModified)
            .etag(etag);
    }

    catch (e) {
        console.error('banner:code:codeAction', e)
        return `errorForBanner`
    }
}

const clickAction = async (request, h) => {

    try {
        DB.get('clicks')
            .push(request.query)
            .write()

        return 'success'
    }

    catch (e) {
        console.error('banner:code:codeAction', e)
        return `errorForBanner`
    }
}

module.exports = [
    {
        method: 'get',
        path: '/code.js',
        config: {
            handler: codeAction,
            validate: {
                query: {
                    id: Joi.number().required(),
                    x: Joi.number().required(),
                    y: Joi.number().required(),
                },
            },
            description: 'Banner code for client application',
            tags: ['banner', 'code'],
        },
    },
    {
        method: 'get',
        path: '/click',
        config: {
            handler: clickAction,
            validate: {
                options: {
                    allowUnknown: true
                },
                query: {
                    id: Joi.number().required(),
                    click_id: Joi.string().required(),
                },
            },
            description: 'Banner click',
            tags: ['banner', 'click'],
        },
    },
]
