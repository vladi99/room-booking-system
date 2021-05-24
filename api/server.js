import { execSync } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import waitForDbConnection from './utils/wait-for-db-connection'
import { setHeaders } from './middlewares/headers';
import routes from './routes'

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(setHeaders)

await waitForDbConnection(db.sequelize, 1000);

// run pending migrations
// TODO: decouple migrations from server startup
execSync('sequelize db:migrate', { stdio: 'inherit' });

app.use('/api', routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
