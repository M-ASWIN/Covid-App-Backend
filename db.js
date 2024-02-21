import mysql from 'mysql';

const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:'aswin2004',
    database:'covidapplication'
});

export default db;