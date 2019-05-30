import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const DEV_DB_NAME = 'test';
const DEV_SECRET = 'my-secret';
const PROD_DB_NAME = 'test';
const PROD_SECRET = 'my-secret';

export function setEnvironment(app) {
  if (process.env.NODE_ENV !== 'production') {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
}

function setDevEnv(app) {
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = 'mongodb://localhost:27017/' + DEV_DB_NAME;
  process.env.TOKEN_SECRET = DEV_SECRET;
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(cors());
}

function setProdEnv(app) {
  process.env.NODE_ENV = 'production';
  process.env.DB_URL = 'mongodb://localhost:27017/' + PROD_DB_NAME;
  process.env.TOKEN_SECRET = PROD_SECRET;
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../dist/content'));
}
