const fs = require("fs");
const http = require('http');

const err_file_name = "error_log.txt";
const warn_file_name = "warning_log.txt";

try {
    if(!fs.existsSync(err_file_name)) {
        fs.writeFileSync(err_file_name, "");
    }
    
    if(!fs.existsSync(warn_file_name)) {
        fs.writeFileSync(warn_file_name, "");
    }
} catch(err) {
    console.log(err);
}

const writeErrLog = () => {
    const date = new Date();
    const error_log = `Error occurred at: ${date}`;

    try {
        fs.appendFileSync(err_file_name, error_log+ "\n");
    } catch(err) {
        console.log(err);
    }
}

const writeWarnLog = () => {
    const date = new Date();
    const warning_log = `Warning occurred at: ${date}`

    try {
        fs.appendFileSync(err_file_name, warning_log + "\n");

    } catch(err) {
        console.log(err);
    }
}



const server = http.createServer((req, res) => {
    console.log(req);
    if(req.method=="GET" && req.url == "/") {
        const html = fs.readFileSync("index.html", {encoding : "utf-8"});
        res.writeHead(200, {"Content-type" : "text/html"});
        res.end(html);
    } else if(req.method == "GET" && req.url == "/log_error") {
        writeErrLog();
        res.writeHead(302, {"Location" : "/"});
        res.end();
    } else if(req.method == "POST" && req.url == "/log_warning") {
        writeWarnLog();
        res.writeHead(302, {"Location" : "/"});
        res.end();
        //todo: save log warning
    } else if(req.method == "GET" && req.url == "/errors") {
        res.writeHead(200);
        try {
            const errors = fs.readFileSync(err_file_name,{encoding : "utf-8"});

        } catch(err) {

        }
        //todo: send error logs
    } else if(req.method == "GET" && req.url == "/warnings") {
        res.writeHead(200);
        //todo: send warning logs
    } else if(req.method == "GET" && req.url == "/all") {
        res.writeHead(200);
        //todo: send error and warning logs
    } else if(req.method == "GET" && req.url == "/client.js") {
        const js = fs.readFileSync("client.js", {encoding:"utf-8"});
        res.writeHead(200, {"Content-type":"text/javascript"});
        res.end(js);
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("SERVER LISTNENING...");
})