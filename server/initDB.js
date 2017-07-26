import path from 'path'
import initdb from 'fl-initdb'

export default function initDB(callback) {
  if (process.env.SKIP_INIT_DB) return callback()
  initdb({
    User: require('./models/User'),
    modelTypes: [require('fl-auth-server').AccessToken, require('fl-auth-server').RefreshToken],
    databaseUrl: process.env.DATABASE_URL,
    modelsDir: path.resolve(__dirname, './models'),
    scaffold: require(`../scaffold/${process.env.NODE_ENV}`),
    __dangerouslyWipeTheEntireDatabase: process.env.DANGEROUSLY_WIPE_DB_CRAZY_MAN === 'yesplease',
  }, (err, models) => {
    if (err) console.trace('Error initialising database:', err)
    callback(err, models)
  })
}
