const fs = require("fs");
const http = require("http");

const err_file_name = "error_log.txt";
const warn_file_name = "warning_log.txt";

try {
  if (!fs.existsSync(err_file_name)) {
    fs.writeFileSync(err_file_name, "");
  }

  if (!fs.existsSync(warn_file_name)) {
    fs.writeFileSync(warn_file_name, "");
  }
} catch (err) {
  console.log(err);
}

const writeErrLog = () => {
  const date = new Date();
  const error_log = `Error occurred at: ${date}\n`;

  try {
    fs.appendFileSync(err_file_name, error_log);
  } catch (err) {
    console.log(err);
  }
};

const writeWarnLog = () => {
  const date = new Date();
  const warning_log = `Warning occurred at: ${date}\n`;

  try {
    fs.appendFileSync(warn_file_name, warning_log);
  } catch (err) {
    console.log(err);
  }
};

const html = fs.readFileSync("index.html", { encoding: "utf-8" });
const js = fs.readFileSync("client.js", { encoding: "utf-8" });

const server = http.createServer((req, res) => {
  if (req.method == "GET" && req.url == "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(html);
  } else if (req.method == "POST" && req.url == "/log_error") {
    writeErrLog();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.write("<h3>An error has been logged</h3>");
    res.end();
  } else if (req.method == "POST" && req.url == "/log_warning") {
    writeWarnLog();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.write("<h3>An warning has been logged</h3>");
    res.end();
  } else if (req.method == "GET" && req.url == "/errors") {
    try {
      const errors = fs
        .readFileSync(err_file_name, { encoding: "utf-8" })
        .trim();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.write(`<div id='error'><h3>Error Log</h3>`);
      errors.split("\n").map((value) => {
        res.write(`<p>${value.trim()}</p>`);
      });
      res.write(`</div>`);

      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(404);
      res.end();
    }
  } else if (req.method == "GET" && req.url == "/warnings") {
    try {
      const warnings = fs
        .readFileSync(warn_file_name, { encoding: "utf-8" })
        .trim();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.write(`<div id='warning'><h3>Warning Log</h3>`);
      warnings.split("\n").map((value) => {
        res.write(`<p>${value.trim()}</p>`);
      });
      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(404);
      res.end();
    }
  } else if (req.method == "GET" && req.url == "/all") {
    try {
      const errors = fs
        .readFileSync(err_file_name, { encoding: "utf-8" })
        .trim();
      const warnings = fs
        .readFileSync(warn_file_name, { encoding: "utf-8" })
        .trim();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.write(`<div id='error'><h3>Error Log</h3>`);
      errors.split("\n").map((value) => {
        res.write(`<p>${value.trim()}</p>`);
      });
      res.write(`</div>`);

      res.write(`<div id='warning'><h3>Warning Log</h3>`);
      warnings.split("\n").map((value) => {
        res.write(`<p>${value.trim()}</p>`);
      });
      res.write(`</div>`);

      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(404);
      res.end();
    }
  } else if (req.method == "GET" && req.url == "/client.js") {
    res.writeHead(200, { "Content-type": "text/javascript" });
    res.end(js);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("SERVER LISTNENING...");
});
