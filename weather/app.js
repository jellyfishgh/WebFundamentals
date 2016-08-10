const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const mime = require('mime');
const colors = require('colors');

const port = 3000;
const host = 'localhost';

http.createServer((req, res) => {
    console.log(`${colors.green(req.method)} ${colors.yellow(req.url)}`);
    let urlObj = url.parse(req.url);
    res.writeHead(200, {
        'Content-Type': mime.lookup(urlObj.pathname)
    });
    fs.createReadStream(path.join('public', urlObj.pathname)).on('error', () => {
        resNoPage(res);
    }).pipe(res);
}).listen(port, host, (err) => {
    if (err) return console.error(err);
    console.log(`server listening at http://${host}:${port}/`);
});

function resNoPage(res) {
    res.writeHead(404);
    res.end();
}