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
function createGarageTable() {
    sql = `CREATE TABLE IF NOT EXISTS garage (
            garage_id INT NOT NULL AUTO_INCREMENT,
            garage_name VARCHAR(255),
            garage_address VARCHAR(255),
            PRIMARY KEY(garage_id)
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
            warehouse_id INT NOT NULL AUTO_INCREMENT,
            warehouse_name VARCHAR(255),
            warehouse_address VARCHAR(255),
            national_price DECIMAL(10,2),
            national_discount DECIMAL(10,2),
            last_dispatch_date date,
            PRIMARY KEY(warehouse_id)
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
            staff_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            staff_email VARCHAR(255),
            staff_phone VARCHAR(255),
            hire_date date,
            PRIMARY KEY(staff_id)
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
            part_id INT NOT NULL AUTO_INCREMENT,
            part_name VARCHAR(255),
            part_price DECIMAL(10,2),
            part_quantity INT,
            PRIMARY KEY(part_id)
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
            order_id INT NOT NULL AUTO_INCREMENT,
            order_date DATETIME,
            customer_id int,
            part_id int,
            total_price DECIMAL(10,2),
            order_status VARCHAR(255),
            PRIMARY KEY(order_id)
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
            customer_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            customer_phone VARCHAR(255),
            customer_email VARCHAR(255),
            customer_address VARCHAR(255),
            PRIMARY KEY(customer_id)
        );`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Error creating Customer Table: ' + err.stack);
        } else {
            console.log('Successfully created Customer Table');
        }
    });
}

// create manager table
function createManagerTable() {
    sql = `CREATE TABLE IF NOT EXISTS manager (
            manager_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            manager_email VARCHAR(255),
            manager_phone int,
            PRIMARY KEY(manager_id)
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
createGarageTable();
createWarehouseTable();
createStaffTable();
createPartsTable();
createOrderTable();
createCustomerTable();
createManagerTable();