const http = require("http");

const port = 8081;

http
    .createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Hello, this is from my server</h1>")
        res.end();
    })
    .listen(port, () => {
        console.log("Listening on port " + port);
    });