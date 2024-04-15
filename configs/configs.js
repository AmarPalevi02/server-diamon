const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

module.exports = {
    rootPath : path.resolve(__dirname, '..'),
    server_url: process.env.URL_MONGO_DEV,
    jwtkey: process.env.SECRET
}