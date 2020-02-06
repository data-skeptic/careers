const AWS = require('aws-sdk');
const cache = require('memory-cache-ttl');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var s3 = new AWS.S3({region: 'us-west-2'});


cache.init({ ttl: 60 * 60 * 3, interval: 1, randomize: false });

const bucket_name = "serverless-crawl";

var app = express();

//var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
//app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));


app.use(express.static(path.join(__dirname, 'public')))

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', async function(req, res) {
    res.render('pages/index')
})

app.get('*', (req, res) => res.send('Page Not found 404'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

