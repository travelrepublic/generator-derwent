import * as path from 'path';
import * as url from 'url';

import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

// node-ts is not picking up the declaration file for some reason.
let proxy: Function = require('proxy-middleware')

let env = process.env.NODE_ENV || 'dev',
    config = require('./config.' + env);

let index: express.Router = require('./routes/index'),
    templates: express.Router = require('./routes/templates'),
    app = express();

console.log(process.env.NODE_ENV);

// view engine setup
app.set('views', [
    path.join(__dirname, 'static/views'),
    path.join(__dirname, 'app')
]);
app.set('view engine', 'jade');

//     Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//    Proxy to api:
// app.use('/api/cms/components', proxy(url.parse(config.cmsServiceUrl)));
	
//    Agent Authentication:
// var agentOpt: any = url.parse(config.agentServiceUrl);
// agentOpt.cookieRewrite = config.cookieDomain;
// app.use('/api/agents', proxy(agentOpt));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/images', express.static('static/images'));
app.use('/vendors', express.static('node_modules'));
app.use('/css', express.static('static/css'));
app.use('/js', express.static('static/js'))

app.use('/', templates);
app.use('/', index);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function) => {
    res.status(404).send('Not Found!');
});

app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    })
});

module.exports = app;