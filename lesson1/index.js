const path = require('path');
const { ENV, APP_PORT } = require(path.join(__dirname,'./src/config'));
const { StartServer } = require(path.join(__dirname,'./src/app'));
const logger = require(path.join(__dirname,'./src/logger'));

StartServer(APP_PORT, ENV, logger);