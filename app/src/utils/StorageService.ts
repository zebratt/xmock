const remote = require('electron').remote
const low = remote.require('lowdb')
const FileSync = remote.require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

export default db
