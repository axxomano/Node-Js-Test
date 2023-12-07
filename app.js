const express = require('express');
const app = express();
const sequelize = require('./config/database');
const routes = require('./routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', routes);

sequelize.sync().then(() => {
  app.listen(3000);
});
