const sequelize = require('./config/sqlite');

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  require('./data/syncschema');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});