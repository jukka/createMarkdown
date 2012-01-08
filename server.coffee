express = require('express')
fs = require('fs')

mdre = /\.(md|mdtext|markdown)$/;

[ node, server, base, port ] = process.argv
port ?= 3000
base  = fs.realpathSync(base || __dirname)

server = express.createServer()
server.use express.bodyParser()

server.get mdre, (req, res, next) ->
  if /html/.test(req.headers.accept)
    res.sendfile
  else
    next()

server.use express.directory(base)
server.use express.static(base)
server.use express.errorHandler({ stack: true })

server.listen port

