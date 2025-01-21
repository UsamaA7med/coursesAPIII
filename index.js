const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.write("<h1>hello world<h1>");
  res.end();
});

server.listen(3001, "localhost", (res, req) => {
  console.log("Server is running on port 3001");
});
