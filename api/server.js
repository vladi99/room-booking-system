import { execSync } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import waitForDbConnection from './utils/wait-for-db-connection'
import counterRoute from './routes/counter'

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

await waitForDbConnection(db.sequelize, 1000);

// run pending migrations
execSync('sequelize db:migrate', { stdio: 'inherit' });

app.get('/', (req, res) => {
  res.json({message: 'Hello world.'});
});

counterRoute(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
