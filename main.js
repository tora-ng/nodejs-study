var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

const templateHtml = (title, list, body) => {
    return `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <a href="/create">create</a>
          ${body}
        </body>
        </html>
        `
}

const templateList = (fileList) => {
    var list = '<ul>';
    var i = 0;
    while (i < fileList.length) {
        list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;

    if (pathName === '/') {
        if (!queryData.id) {
            fs.readdir('./data', (error, fileList) => {
                var list = templateList(fileList);
                var title = 'Welcome!';
                var description = 'Hello, node.js!'
                templateList(fileList);
                var template = templateHtml(title, list, `<h2>${title}</h2>${description}`);
                response.writeHead(200);
                response.end(template);
            })
        } else {
            fs.readdir('./data', (error, fileList) => {
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var list = templateList(fileList);
                    var title = queryData.id;
                    var template = templateHtml(title, list, `<h2>${title}</h2>${description}`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else if (pathName === '/create') {
        fs.readdir('./data', (error, fileList) => {
            var list = templateList(fileList);
            var title = 'WEB - create!';
            templateList(fileList);
            var template = templateHtml(
                title,
                list,
                `
          <form action="http://localhost:3000/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `
            );
            response.writeHead(200);
            response.end(template);
        });
    } else if (pathName === '/create_process') {
      var body = '';
      request.on('data', function(data){
        // 웹브라우저가 포스트 방식으로 데이터를 전송할 때 데이터의 양이 많을 경우 프로그램이 꺼지거나 컴퓨터에 무리가 가는 것을 방지하여 사용하는 것
        // 웹브라우저에서 데이터를 받을 때 콜백 함수가 실행되고, data 안에 전달 받은 값이 들어있음
        body = body + data;
      });
      request.on('end', function(data){
        // 더 이상 데이터가 들어오지 않으면 해당 콜백함수가 실행됨
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        console.log('title:' , title);    
        console.log('description:' , description);    
      });
      response.writeHead(202);
      response.end('create_process');

    } else {
        response.writeHead(404);
        response.end('Not found');
    }

});
app.listen(3000);