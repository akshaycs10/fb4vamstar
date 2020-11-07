import 'babel-polyfill';
import path from 'path';
import express from 'express';

import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';
import config from '../config.json';

const DIST_DIR = path.join(__dirname, 'public');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

async function initApp() {
  const app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(routes);
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
  });

  await initDatabaseConnection()
  return app;
}

function initDatabaseConnection() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', initDatabaseConnection)
    .once('open', listen);
  return mongoose.connect(config.mongodb, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

function listen() {
  console.log("mongodb connection active")
}
export default initApp;
