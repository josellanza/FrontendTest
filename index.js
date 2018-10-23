const http  = require('http');
const fs = require('fs');
const path = require('path');

const httpServer = http.createServer(requestResponseHandler);
httpServer.listen(1337, () => {
  console.log('Node.JS static file server is listening on port 1337')
})
function requestResponseHandler(req, response){
  console.log(`request came: ${req.url}`);
  if(req.url === '/'){
    sendResponse('index.html', 'text/html', response)
  }else{
    sendResponse(req.url, getContentType(req.url), response);
  }
}

function sendResponse(url, contentType, res){
  let file = path.join(__dirname, url);
  fs.readFile(file, (err, content) => {
    if(err){
      res.writeHead(404);
      res.write(`File '${file}' Not Found!`);
      res.end();
      console.log('Response: 404 ${file}, err');
    }else{
      res.writeHead(200, {'Content-Type': contentType});
      res.write(content);
      res.end();
      console.log(`Response: 200 ${file}`);
    }
  })
}


function getContentType(url){
  switch (path.extname(url)) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    default:
      return 'application/octate-stream';
  }
}