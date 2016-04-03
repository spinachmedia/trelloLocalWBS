var http = require('http');
var fs = require('fs');
var path=require('path');
qs = require('querystring');

var mimeTypes={
  '.html' : 'text/html',
  '.css' : 'text/css',
  '.js' : 'text/javascript',
  '.jpg' : 'image/jpg',
  '.png' : 'image/png',
};


http.createServer(function(req,res){
var lookup = decodeURI(req.url);
    
    var targetFile = __dirname + lookup;
    
    //===========
    
    //ルートへのアクセスは、index.htmlに。
    if(lookup == "/"){
      targetFile = __dirname + "/index.html";
    }
    
    //===========
    
    //ファイルが存在するならば、返す。
    fs.exists(targetFile , function(exists){
      if(exists){
        fs.readFile(targetFile,function(err,data){
          if(err){
            res.writeHead(500);
            res.end('Server Error !');
            return;
          }
          var headers = {'Content-Type' : mimeTypes[path.extname(targetFile)]};
          res.writeHead(200,headers);
          res.end(data);
        });
        return;
      }
      res.writeHead(404);
      res.end('ページが見つかりません');
    });
}).listen(4000);

console.log('Server is runnning...');
console.log('http://localhost:4000');