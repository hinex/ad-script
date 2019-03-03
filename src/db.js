const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('../database/db.json')

const db = low(adapter)

db.defaults({ projects: [], clicks: [] }).write()

module.exports = db
