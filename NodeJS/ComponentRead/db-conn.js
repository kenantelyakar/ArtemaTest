'use strict';
const xsenv = require('@sap/xsenv');
const pgp = require('pg-promise')();
let dbConf = {
    host: '',
    port: '',
    database:'' ,
    user: '',
    password: '',
    ssl: {
        rejectUnauthorized : false,
        ca   : '',
  }
}
let sslCert = '';
const createTable =
    'CREATE TABLE IF NOT EXISTS Users \
        ( \
            id serial, \
            name varchar(100), \
            color varchar(100), \
            material varchar(100), \
            PRIMARY KEY (id) \
        )';

// const dropTable = 'DROP TABLE Users'; // eslint-disable-line no-unused-vars
// const insertRow = "INSERT INTO users(name,color,material) values('SpongeBob','yellow','sponge')"; // eslint-disable-line no-unused-vars

function returnUriToDB() {
    var uri = '';
    if (process.env.VCAP_SERVICES) {
        // running in cloud
        //uri = xsenv.cfServiceCredentials('postgresql-cf').uri;
        //sslCert = xsenv.cfServiceCredentials('postgresql-cf').sslcert;
        dbConf.host = xsenv.cfServiceCredentials('postgresql-cf').hostname;
        dbConf.port = xsenv.cfServiceCredentials('postgresql-cf').port;
        dbConf.database = xsenv.cfServiceCredentials('postgresql-cf').dbname;
        dbConf.user = xsenv.cfServiceCredentials('postgresql-cf').username;
        dbConf.password = xsenv.cfServiceCredentials('postgresql-cf').password;
        dbConf.ssl.ca = xsenv.cfServiceCredentials('postgresql-cf').sslcert;
    } else {
        console.log('running locally is not supported');
    }
    return uri;
}


function getDB(cb) {
    returnUriToDB();
    var db = pgp(dbConf);
    let sql = createTable;
    db.query(sql)
        .then(function () {
            console.log('database initialized');
            cb(null, db);
            return;
        })
        .catch((err) => {
            console.log(err);
            cb(err, null);
            return;
        });
        cb(null, db);
}

module.exports = {
    getDB: getDB,
    returnUriToDB : returnUriToDB
};

