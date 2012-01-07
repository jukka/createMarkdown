express = require('express')
fs = require('fs')

[ node, server, base, port ] = process.argv
port ?= 3000
base = fs.realpathSync(base || '.')

postHtml = (req, res) ->
  file = base + req.url.replace(/\.html$/, '.md')
  console.log(req.body)
  fs.writeFile(file, req.body.content, (err) -> res.send(err ? 500 : 201))

postMarkdown = (req, res) ->
  file = base + req.url
  console.log(req.body)
  fs.writeFile(file, req.body.content, (err) -> res.send(err ? 500 : 202))

server = express.createServer()
server.use(express.bodyParser())
server.get('/', (req, res) -> res.render('template.jade', { layout: false }))
server.post(/\.html$/, postHtml)
server.post(/\.(md|mdtext|markdown)$/, postMarkdown)
server.use(express.static(base))
server.use(express.errorHandler({ dumpExceptions: true }))
server.listen(port)

