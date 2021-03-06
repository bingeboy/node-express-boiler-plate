
var express = require("express")
    , config = require("../bin/config")
    , RedisStore = require('connect-redis')(express)
    , path     = require('path')
    , cons = require('consolidate')


module.exports = function ( app, publicDirectory ){

    app
    .engine('html', cons.jade)
    .set('view engine', 'jade')
    .set('views', publicDirectory + '/views')
    .use(express.static(path.join( publicDirectory , '/public' )))
    .use(express.static(publicDirectory + '/static'))
    .use(express.bodyParser({ keepExtensions: true, uploadDir: publicDirectory + '/public/uploads' }))
    .use(express.methodOverride())
    .use(express.cookieParser())
        .use(express.session({
        store: new RedisStore({
            host: config.host,
            port: config.redisPort,
            db: config.redisDB,
            pass: config.redisPassword
            }),
        secret: '1234567890QWERTY'
        }))

    .use(express.logger('dev'))
    .use(express.methodOverride())
    .use(express.cookieParser())
    .use(express.errorHandler())
}

