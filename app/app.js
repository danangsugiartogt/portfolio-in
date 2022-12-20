const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/dbConnection');
const router = require('./routes/index.route');

dotenv.config({ path: path.resolve(__dirname, './.env') });

// test db connection
db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

const app = express();
const prefixApi = process.env.PREFIX_API || 'api/v2/';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(prefixApi, router);

const port = process.env.PORT || 2007;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
