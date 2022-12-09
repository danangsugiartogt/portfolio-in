const express   = require('express')
    , dotenv    = require('dotenv')
    , path      = require('path')
    , db        = require('./database/dbConnection.js')
    , router    = require('./routes/index.route.js');

dotenv.config({path:path.resolve(__dirname, './.env')});

// test db connection
db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

// sync db
// (async ()=> {
//     await db.sync({force: true});
//     console.log('database sync successfully.');
// })()

const app = express();
const prefixApi = process.env.PREFIX_API || 'api/v2/';

app.use(express.json());
app.use(prefixApi, router);
app.use('api/v1', router);

const port = process.env.PORT || 2007;
app.listen(port, ()=> {
    console.log(`server is running at port ${port}`);
})