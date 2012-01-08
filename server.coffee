express = require('express')
fs = require('fs')

mdre = /\.(md|mdtext|markdown)$/;

[ node, server, base, port ] = process.argv
port ?= 3000
root  = fs.realpathSync(root || __dirname)

server = express.createServer()
server.use express.bodyParser()

server.use '/-', express.static(__dirname)

server.get mdre, (req, res, next) ->
  if /html/.test(req.headers.accept)
    express.static.send req, res, next,
      root: __dirname,
      path: 'editor.html'
  else
    next()

server.use express.static(root)
server.use express.directory(root)
server.use express.errorHandler({ stack: true })

server.listen port

