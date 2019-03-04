const Joi = require('joi')

const fileAction = async (request, h) => {

    try {

        const { file } = request.params

        return h.file(file);
    }

    catch (e) {
        console.error('banner:ad:fileAction', e)
        return `errorForBanner`
    }
}

module.exports = [
    {
        method: 'get',
        path: '/file/{file}',
        config: {
            handler: fileAction,
            validate: {
                params: {
                    file: Joi.string().required()
                },
            },
            notes: 'Static files',
            description: 'Files from static folder',
            tags: ['api', 'file'],
        },
    },
]
