var express = require('express');

var server = express.createServer();
server.use('/', express.directory(__dirname));
server.use('/', express.static(__dirname));
server.listen(3000);
