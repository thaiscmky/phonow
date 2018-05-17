if(process.env.NODE_ENV === 'production') {
    module.exports = {
        googleClientID: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
} else {
    module.exports = require('./config.json').apiconfig;
}