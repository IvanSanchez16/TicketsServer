const mysql = require('mysql');

const objConnection = {
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "secret135",
    "database": "sistema_tickets"
}

const myConn = mysql.createConnection(objConnection);

myConn.connect((error) => {
    if (error)
        console.log(error);
    else
        console.log(`Conexión realizada correctamente`);
});

module.exports = myConn;