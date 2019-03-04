module.exports = {
    General: {
        port: process.env.API_PORT || 5000,
        domain: process.env.API_DOMAIN || 'http://localhost',
        cors: true,
    }
}
