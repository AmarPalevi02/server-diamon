const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    server_url: process.env.URL_MONGO_DEV
}