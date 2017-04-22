const restify = require('restify');
const plugins = require('restify-plugins');
const setRoutes = require('./routes');

const server = restify.createServer({
  name: 'phone-book-backend',
  version: '1.0.0'
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

setRoutes(server);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
