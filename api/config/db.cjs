module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST_IP,
    port: 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST_IP,
    port: 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST_IP,
    port: 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
  }
};
