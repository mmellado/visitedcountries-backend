import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import apiRouter from './routes/api';

var app = express();

mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  next();
});

app.use('/api', apiRouter);

app.get('/', function (req, res) {
  res.send('Status: online')
})

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'));
console.info('==> ✅  Server is listening in ' + process.env.NODE_ENV + ' mode');
console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
