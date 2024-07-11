// #!/usr/bin/env node
'use strict';
const express = require('express');
const router = express.Router();
const {Cloudflare , helpers } = require('../lib/Cloudflare');


const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36';
const headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',

}

let cloudflare = new Cloudflare();

// console.time('end');
// cloudflare.request({
//   maxRedirects: 2,
//   url: URL
// })
//     .then(_ => {
//       console.timeEnd('end');
//       console.log(helpers.pretty(helpers.convertResponse(_)));
//       console.log(_);
//     })
//     .catch(err => {
//       console.log(err);
//     });


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/v1', (req, res, next) => {
    console.log(req.body);
    switch (req.body.cmd) {
        case "request.get":
            console.time('end');
            cloudflare.request({
                maxRedirects: 2,
                url: req.body.url,
                userAgent: userAgent,
                headers: headers
            })
                .then(_ => {
                    console.timeEnd('end');
                    console.log(helpers.pretty(helpers.convertResponse(_)));
                    res.send(helpers.pretty(helpers.convertResponse(_)));
                })
                .catch(err => {
                    console.log(err);
                });
            break;
        default:
            res.send('Invalid Command');
    }
});
router.get('/v1', (req, res, next) => {
    const {url, apikey, cmd} = req.query;
    if(apikey!=="TanNhatCMS") return next();
    switch (cmd) {
        case "request.get":
            console.time('end');
            cloudflare.request({
                maxRedirects: 2,
                url: url,
                userAgent: userAgent,
                headers: headers
            })
                .then(data => {
                    console.timeEnd('end');
                    res.set('Content-Type', data.headers['content-type']);
                    console.log(data.headers['content-type']);
                    res.set('content-length', data.headers['content-length']);
                    console.log(data.headers['content-length']);
                    res.set('accept-ranges', data.headers['accept-ranges']);
                    res.send(Buffer.from(data.body, 'binary'));
                })
                .catch(err => {
                    console.log(err);
                });
            break;
        default:
            res.send('Invalid Command');
    }
});
module.exports = router;
