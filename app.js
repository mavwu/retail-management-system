const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mavwu_retail_db',
    port: 3306
});

connection.connect((err => {
    if(err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database successfully!!')
}))

const app = express();
const port = 3000;
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// create garage table
function createLocalGarageTable() {
    sql = `CREATE TABLE IF NOT EXISTS garage (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            location VARCHAR(255),
            PRIMARY KEY(id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Error creating Garage Table: ' + err.stack);
            return;
        } else {
            console.log('Successfully created Garage Table');
        }
    });
}

// create warehouse table
function createWarehouseTable() {
    sql = `CREATE TABLE IF NOT EXISTS warehouse (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            location VARCHAR(255),
            PRIMARY KEY(id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Error creating Warehouse Table: ' + err.stack);
            return;
        } else {
            console.log('Successfully created Warehouse Table');
        }
    });
}

// create staff table
function createStaffTable() {
    sql = `CREATE TABLE IF NOT EXISTS staff (
            id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            hire_date date,
            PRIMARY KEY(id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Error creating Staff Table: ' + err.stack);
        } else {
            console.log('Successfully created Staff Table');
        }
    });
}

// create parts table
function createPartsTable() {
    sql = `CREATE TABLE IF NOT EXISTS parts  (
            id INT NOT NULL AUTO_INCREMENT,
            part_name VARCHAR(255),
            PRIMARY KEY(id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Error creating Parts Table: ' + err.stack);
        } else {
            console.log('Successfully created Parts Table');
        }
    });
}

// create order table
function createOrderTable() {
    sql = `CREATE TABLE IF NOT EXISTS orders (
            id INT NOT NULL AUTO_INCREMENT,
            order_date DATETIME,
            order_status VARCHAR(255),
            PRIMARY KEY(id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Error creating Order Table: ' + err.stack);
        } else {
            console.log('Successfully created Order Table');
        }
    });
}

// create customer table
function createCustomerTable() {
    sql = `CREATE TABLE IF NOT EXISTS customer (
            id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            phone_number VARCHAR(255),
            email VARCHAR(255),
            address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(255),
            zip VARCHAR(255),
            PRIMARY KEY(id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Error creating Customer Table: ' + err.stack);
        } else {
            console.log('Successfully created Customer Table');
        }
    })
}

// create manager table
function createManagerTable() {
    sql = `CREATE TABLE IF NOT EXISTS manager (
            id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            PRIMARY KEY(id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Error creating Manager Table: ' + err.stack);
        } else {
            console.log('Successfully created Manager Table');
        }
    })
}

// run table creation methods
createLocalGarageTable();
createWarehouseTable();
createStaffTable();
createPartsTable();
createOrderTable();
createCustomerTable();
createManagerTable();