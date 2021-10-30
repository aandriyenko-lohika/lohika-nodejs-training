# Lesson 1

### Homework

1. Create the app.js file with the server example (may be copied from the slides) which accepts requests and responds with “Hellow world!” message to all requests.
  - server on port <APP_PORT> which responds with “Hello world!” message to all requests.

2. Take APP_PORT (for server) from env variables, <ENV> from cli args and populate config object which will be imported in the app.js from config.js.
  - <APP_PORT> env variable
  - <ENV> cli arg
  - config.js with config object which contains <APP_PORT>, <ENV>

3. When server is up – log a message: Server is listening on port <PORT>. Env is <ENV>. Use the logger created in a separate file which will use console methods for now
  - log a message Server is listening on port <PORT>. Env is <ENV>. Using the imported logger (from separate file)

### Run project
1. `export APP_PORT=3060`
2. `npm start`