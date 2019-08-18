let http = require("http");
fs = require('fs');
let htmlFile;

fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err;
    }
    htmlFile = data;
});

http.createServer(function (request, response) {
        if (request.url == '/') {
            response.writeHeader(200, {
                "Content-Type": "text/html"
            });
            response.write(htmlFile);
            response.end();
        }
        if (request.url == '/http//localhost:3000/cv') {
            response.writeHead(200, {
                "Content-Type": "text/pdf"
            });
            cvSend = fs.createReadStream('./CV.pdf');
            cvSend.pipe(response);
        } else {
            fs.readFile('.' + request.url, {
            }, function (err, data) {
                if (!err) {
                    var dotoffset = request.url.lastIndexOf('.');
                    var mimetype = dotoffset == -1 ?
                        'text/plain' : {
                            '.html': 'text/html',
                            '.ico': 'image/x-icon',
                            '.jpg': 'image/jpeg',
                            '.png': 'image/png',
                            '.gif': 'image/gif',
                            '.css': 'text/css',
                            '.js': 'text/javascript',
                            '.woff': 'application/font-woff woff',
                            '.eot': 'application/font-woff woff',
                            '.ttf': 'text/ttf',
                            '.svg': 'image/svg',
                            '.pdf': 'text/pdf'
                        } [request.url.substr(dotoffset)];
                    response.setHeader('Content-type', mimetype);
                    response.end(data);
                } else {
                    console.log('file is not found: ' + request.url);
                    response.writeHead(404, "Not Found");
                    response.end();
                }
            });
        }
    }
).listen(3000);