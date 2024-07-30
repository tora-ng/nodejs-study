var http = require('http');
var fs = require('fs');
var url = require('url');

const {log} = require('console');
var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url
        .parse(_url, true)
        .query;
    var pathName = url
        .parse(_url, true)
        .pathname;

    if (pathName === '/') {
        if (!queryData.id) {

            fs.readdir('./data', (error, fileList) => {
                var title = 'Welcome!';
                var description = 'Hello, node.js!'
                var list = '<ul>';
                var i = 0;
                while (i < fileList.length) {
                    list = list + `<li><a href="?id=${fileList[i]}">${fileList[i]}</a></li>`;
                    i = i + 1;
                }
                list = list + '</ul>';

                var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
                response.writeHead(200);
                response.end(template);
            })
        } else {
            fs.readdir('./data', (error, fileList) => {
                var title = 'Welcome!';
                var description = 'Hello, node.js!'
                var list = '<ul>';
                var i = 0;
                while (i < fileList.length) {
                    list = list + `<li><a href="?id=${fileList[i]}">${fileList[i]}</a></li>`;
                    i = i + 1;
                }
                list = list + '</ul>';
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }

});
app.listen(5000);