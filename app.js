const express = require("express");
const sqlite3 = require("sqlite3");
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// create garage table
function createGarageTable() {
    
}

// create warehouse table
function createWarehouseTable() {
    
}

// create staff table
function createStaffTable() {
    
}

// create parts table
function createPartsTable() {
    
}

// create order table
function createOrderTable() {
    
}

// create customer table
function createCustomerTable() {
    
}

// create manager table
function createManagerTable() {
    
}

function createUsersTable() {

}
