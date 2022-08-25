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
                        let newToDo = toDoList;
                        newToDo.push(body.item);
                        console.log(newToDo);
                        res.writeHead(201);
                    })
            } else if(method === "DELETE") {
                let body = "";
                req
                    .on("error", (err) => {
                        console.error(err);
                    })
                    .on("data", (chunks) => {
                        body += chunks;
                    })
                    .on("end", () => {
                        body = JSON.parse(body);
                        let deleteThis = body.item;
                        for (i = 0; i < toDoList.length; i++){
                            if (toDoList[i] === deleteThis) {
                                toDoList.splice(i, 1);
                                break;
                            }
                        }
                        console.log(toDoList);
                        res.writeHead(204);
                    })
            } else {
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