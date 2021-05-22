import { execSync } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import waitForDbConnection from './utils/wait-for-db-connection'
import userRoute from './routes/user'
import companyRoute from './routes/company'
import roomRoute from './routes/room'
import meetingRoute from './routes/meeting'

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

userRoute(app);
companyRoute(app);
roomRoute(app);
meetingRoute(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
