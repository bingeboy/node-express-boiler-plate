
var config   = require('./bin/config')
    , mongoose = require('mongoose')
    , express  = require('express')
    , routes   = require('./routes')
    , middleware = require('./middleware')
    , fs       = require('fs')
    , http     = require('http')
    , util     = require('util')
    , port =  config.port;

var publicDirectory;

mongoose.set('debug', true);
mongoose.connect(config.db , function (err) {
  if (err) throw err;
    var app = express();

    publicDirectory = __dirname;
    app.listen(port, function() {
         console.log('NerdMiner server running Express listening on port ' +  port)
    })

    middleware(app, publicDirectory)
    routes(app)

})
