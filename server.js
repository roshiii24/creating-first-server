const http = require("http");

const port = 8081;

const toDoList = ["Complete Node Byte", "Play Cricket"];

http
    .createServer((req, res) => {
        const { method, url } = req;
        if (url === "/todos") {
            if (method === "GET") {
                res.writeHead(200, {"Content-Type":"text/html"});
                res.write(toDoList.toString());
            } else if (method === "POST") {
                let body = "";
                req
                    .on("error", (err) => {
                        console.error(err);
                    }).on("data", (chunks) => {
                        body += chunks;
                    }).on("end", () => {
                        body = JSON.parse(body);
                        console.log(body);
                    })
            }else {
                res.writeHead(501);
            }
        } else {
            res.writeHead(404);
        }
        res.end(); 
    })
    .listen(port, () => {
        console.log("Listening on port " + port);
    });