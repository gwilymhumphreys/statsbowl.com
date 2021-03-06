const DEFAULT_SECRET = require('crypto').randomBytes(16).toString('hex')
import URL from 'url'

const name = require('../package.json').name.split('.')[0]

const config = {
  name,
  env: process.env.NODE_ENV || 'development',
  version: require('../package').version,

  origins: process.env.ORIGINS || '*',
  sessionAge: process.env.SESSION_AGE || 365 * 24 * 60 * 60 * 1000,

  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
    secure: true,
  },

  secret: process.env.INTERNAL_SECRET || DEFAULT_SECRET,

  gaId: process.env.GOOGLE_ANALYTICS_ID,
  heapId: process.env.HEAP_ID,
  logRocketId: process.env.LOG_ROCKET_ID,

  s3Bucket: process.env.S3_BUCKET || `${name}-${process.env.NODE_ENV}`,
  s3Region: process.env.S3_REGION || 'ap-southeast-2',

  publicPath: process.env.PUBLIC_PATH || '/public',
  maxFileUploadSize: process.env.MAX_FILE_UPLOAD_SIZE || 1024 * 1024 * 10, //10mb

  // These keys from this config object are passed to the client
  clientConfigKeys: ['name', 'url', 'publicPath', 's3Url', 'maxFileUploadSize'],

  database: (process.env.DATABASE_URL || '').split(':')[0],
}

config.s3Url = `https://${config.s3Bucket}.s3-${config.s3Region}.amazonaws.com`

// Messy stuff to get the components of the url if they are specified / partially specified / only specified by url
config.url = process.env.URL
const urlParts = config.url ? URL.parse(config.url) : {}
config.hostname =  process.env.HOSTNAME || urlParts.hostname || '127.0.0.1'
config.port = process.env.PORT || urlParts.port || 80
config.protocol = process.env.PROTOCOL || urlParts.protocol || 'http:'
if (!config.url) config.url = `${config.protocol}//${config.hostname}:${config.port}`

config.internalUrl = process.env.INTERNAL_URL || `http://localhost:${config.port}`

config.orgUrl = org => {
  if (!org || process.env.NODE_ENV === 'development') return config.url
  const subdomain = org.subdomain || org
  return config.url.replace(config.hostname, `${subdomain}.${config.hostname}`)
}

export default config

if (process.env.NODE_ENV === 'production' && config.secret === DEFAULT_SECRET) {
  console.warn('config: Change your internal secret (process.env.INTERNAL_SECRET) to one unique to this project. Its currently', DEFAULT_SECRET)
}
