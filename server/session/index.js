import _ from 'lodash'
import session from 'express-session'
import redisUrl from 'redis-url'
import connectRedis from 'connect-redis'
import sessionstore from 'sessionstore'
import config from '../config'

const NO_SESSION_ROUTES = ['/ping']
let sessionMiddleware = null

const sessionsDBUrl = process.env.SESSIONS_DATABASE_URL
if (!sessionsDBUrl) console.log('Warning: Missing process.env.SESSIONS_DATABASE_URL')

if (sessionsDBUrl && sessionsDBUrl.match(/^redis/)) {
  const RedisStore = connectRedis(session)
  const sessionUrlParts = redisUrl.parse(sessionsDBUrl)
  const redisOptions = {
    pass: sessionUrlParts.password,
    host: sessionUrlParts.hostname,
    port: +sessionUrlParts.port || 6379,
    db: sessionUrlParts.pathname ? +sessionUrlParts.pathname.split('/')[1] : 1,
    ttl: config.sessionAge/1000,
    prefix: `${process.env.NODE_ENV}-${config.name}-session:`,
    logErrors: true,
  }
  const sessionStore = new RedisStore(redisOptions)
  console.log(`Using redis sessions: ${redisOptions.host}:${redisOptions.port}/${redisOptions.db}`)
  sessionMiddleware = session({saveUninitialized: true, resave: true, secret: 'Ag8ajdD&asdaq3k234HpDkJ', cookie: {maxAge: config.sessionAge}, store: sessionStore})
}
else {
  if (sessionsDBUrl && !sessionsDBUrl.match(/^memory/)) console.log(`Unknown session db protocol: ${sessionsDBUrl}`)
  console.log(`Using memory sessions`)

  sessionstore.createSessionStore()
  sessionMiddleware = session({
    saveUninitialized: true,
    resave: true,
    secret: 'Ag8ajdD&asdaq3k234HpDkJ',
    cookie: {maxAge: config.sessionAge},
    store: sessionstore.createSessionStore(),
  })
}

export default (req, res, next) => {
  if (!sessionMiddleware || _.includes(NO_SESSION_ROUTES, req.url)) return next()
  if (req.query.$auth_secret) return next()
  sessionMiddleware(req, res, next)
}
