const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dbUser: process.env.DB_USER,
  dbUserPassword: process.env.DB_USER_PASSWORD,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 8080
};
