const http = require('http');

function StartServer(port, env, logger) {
  http.createServer((req,res) => {
  logger.log('New request');
  res.writeHeader(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({message: 'Hello world!'}));
}).listen(port, () => {logger.log(`Server is listening on port: ${port} . Env is ${env}`)});
}

module.exports = {
  StartServer
}
