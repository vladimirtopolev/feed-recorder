// In this file you can configure migrate-mongo
const devConfig = require(`./src/config/${process.env.NODE_ENV}.json`);

console.log(process.env.NODE_ENV)
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
