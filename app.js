import createError from 'http-errors';
import express, { json, urlencoded, static as stc } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cors from 'cors';

import indexRouter from './routes/index.js';
import resasRouter from './routes/resas.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({credentials: true}));
// app.options('*', cors())
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stc(path.join(__dirname, 'public')));

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.use('/', indexRouter);
app.use('/resas', resasRouter);

// app.post('/resas', (req,res)=> {

//   console.log("resas" + JSON.stringify(req.body));
// })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
