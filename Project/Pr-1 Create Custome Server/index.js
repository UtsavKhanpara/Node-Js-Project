const http = require("http");

const port = 8000;

const fs = require("fs");

const requestHandler = (req, res) => {
  let filename = "";

  switch (req.url) {
    case "/":
      filename = "./index.html";
      break;
    case "/about":
      filename = "./about.html";
      break;
    case "/contact":
      filename = "./contact.html";
      break;
    case "/blog":
        filename = "./Blog.html";
        break;
    case "/service":
        filename = "./Service.html";
        break;
    default:
      filename = "./404.html";
      break;
  }

  fs.readFile(filename, (err, result) => {
    if (err) {
      console.log("File not found");
      return false;
    }
    res.end(result);
  });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    console.log("Server not started");
    return false;
  }
  console.log(`server started on port:- ${port}`);
});
