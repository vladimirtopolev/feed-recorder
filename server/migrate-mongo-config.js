// In this file you can configure migrate-mongo
const devConfig = require('./src/config/production.json');

const config = {
  mongodb: {
    url: devConfig.CONNECTIONS.MONGODB.URL,
    databaseName: devConfig.CONNECTIONS.MONGODB.DB_NAME,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js"
};

module.exports = config;
