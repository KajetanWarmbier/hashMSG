const http = require('http');

const app = require('./app');

//port configuration
const port = process.env.port || 4567;

//server creation
const server = http.createServer(app);

//server start
server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
