const sequelize = require('./config/dbConfig');

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  require('./data/syncschema');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});