import { basename, dirname, join } from 'path';
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST_IP,
    dialect: 'mysql',
    operatorsAliases: 0
  });

const filename = fileURLToPath(import.meta.url);
const directoryName = dirname(filename);

const db = await Promise.all(await readdirSync(directoryName)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename(filename)) && file.slice(-3) === '.js')
  .map(async (file) => {
    const { default: modelFactory} = await import(pathToFileURL(join(directoryName, file)).href);
    return modelFactory(sequelize, Sequelize.DataTypes, Sequelize.Model);
  })).then(models => {
    return models.reduce((db, model) => {
      db[model.name] = model;
      return db;
    }, {})
});

Object.values(db)
  .filter(m => m.associate)
  .forEach(m => m.associate(db));

db.sequelize = sequelize;

export default db;
