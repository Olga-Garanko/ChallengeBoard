const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dbUser: process.env.DB_USER,
  dbUserPassword: process.env.DB_USER_PASSWORD,
  dbName: process.env.DB_NAME,
  jwtSecret: 'jwtSecret',
  port: process.env.PORT || 8080
};
