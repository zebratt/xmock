const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const filePath = path.resolve(__dirname, '../../../db.json')
const adapter = new FileSync(filePath)
const db = low(adapter)

module.exports = db
