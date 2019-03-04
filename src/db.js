const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const Path = require('path')

const adapter = new FileSync(Path.resolve(__dirname, '../database/db.json'))

const db = low(adapter)

db.defaults({ projects: [], clicks: [] }).write()

module.exports = db
