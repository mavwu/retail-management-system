const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser"); //  parse data from request body

// table names and database name
const dbName = "mavwu_retail_db";
const users = "users";
const manager = "manager";
const customer = "customer";
const order = "orders";
const parts = "parts";
const staff = "staff";
const warehouse = "warehouse";
const garage = "garage";

// create connection to mySQL server
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
});

// create express app
const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));  // to support URL-encoded bodies
app.use(bodyParser.json());  // to support JSON-encoded bodies

function createDatabase() {
    sql = `CREATE DATABASE IF NOT EXISTS ${dbName};`;

    connection.query(sql, err => {
        if (err) {
            console.error('Error creating Database: ' + err.stack);
            return;
        } else {
            console.log('Database created successfully');

            connection.changeUser({ database: dbName }, (err) => {
                if (err) {
                    console.error('Error selecting Database: ' + err.stack);
                    return;
                } else {
                    console.log('Connected to Database successfully');

                    // run table creation methods
                    createGarageTable();
                    createWarehouseTable();
                    createStaffTable();
                    createPartsTable();
                    createOrderTable();
                    createCustomerTable();
                    createManagerTable();
                    createUsersTable();
                }
            })
        }
    });
}

connection.connect((err => {
    if (err) {
        console.error('Error connecting to MySQL server: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL server successfully!!');
    createDatabase();
}))

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// create garage table
function createGarageTable() {
    sql = `CREATE TABLE IF NOT EXISTS ${garage} (
            garage_id INT NOT NULL AUTO_INCREMENT,
            garage_name VARCHAR(255),
            garage_address VARCHAR(255),
            PRIMARY KEY(garage_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error creating Garage Table: ' + err.stack);
            return;
        } else {
            console.log('Successfully created Garage Table');
        }
    });
}

// create warehouse table
function createWarehouseTable() {
    sql = `CREATE TABLE IF NOT EXISTS ${warehouse} (
            warehouse_id INT NOT NULL AUTO_INCREMENT,
            warehouse_name VARCHAR(255),
            warehouse_address VARCHAR(255),
            national_price DECIMAL(10,2),
            national_discount DECIMAL(10,2),
            last_dispatch_date date,
            PRIMARY KEY(warehouse_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error creating Warehouse Table: ' + err.stack);
            return;
        } else {
            console.log('Successfully created Warehouse Table');
        }
    });
}

// create staff table
function createStaffTable() {
    sql = `CREATE TABLE IF NOT EXISTS ${staff} (
            staff_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            staff_email VARCHAR(255),
            staff_phone VARCHAR(255),
            hire_date date,
            PRIMARY KEY(staff_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error creating Staff Table: ' + err.stack);
        } else {
            console.log('Successfully created Staff Table');
        }
    });
}

// create parts table
function createPartsTable() {
    sql = `CREATE TABLE IF NOT EXISTS ${parts}  (
            part_id INT NOT NULL AUTO_INCREMENT,
            part_name VARCHAR(255),
            part_price DECIMAL(10,2),
            part_quantity INT,
            PRIMARY KEY(part_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error creating Parts Table: ' + err.stack);
        } else {
            console.log('Successfully created Parts Table');
        }
    });
}

// create order table
function createOrderTable() {
    sql = `CREATE TABLE IF NOT EXISTS ${order} (
            order_id INT NOT NULL AUTO_INCREMENT,
            order_date DATETIME,
            customer_id int,
            part_id int,
            total_price DECIMAL(10,2),
            order_status VARCHAR(255),
            PRIMARY KEY(order_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error creating Order Table: ' + err.stack);
        } else {
            console.log('Successfully created Order Table');
        }
    });
}

// create customer table
function createCustomerTable() {
    sql = `CREATE TABLE IF NOT EXISTS ${customer} (
            customer_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            customer_phone VARCHAR(255),
            customer_email VARCHAR(255),
            customer_address VARCHAR(255),
            PRIMARY KEY(customer_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error creating Customer Table: ' + err.stack);
        } else {
            console.log('Successfully created Customer Table');
        }
    });
}

// create manager table
function createManagerTable() {
    sql = `CREATE TABLE IF NOT EXISTS ${manager} (
            manager_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            manager_email VARCHAR(255),
            manager_phone int,
            PRIMARY KEY(manager_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error creating Manager Table: ' + err.stack);
        } else {
            console.log('Successfully created Manager Table');
        }
    })
}

function createUsersTable() {
    sql = `CREATE TABLE IF NOT EXISTS ${users} (
            user_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            PRIMARY KEY(user_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error creating Users Table: ' + err.stack);
        } else {
            console.log('Successfully created Users Table');
        }
    });
}
