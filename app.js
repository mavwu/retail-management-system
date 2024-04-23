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

// create express app
const app = express();
const PORT = 3000;
app.use(express.static("public"));  // serve static files from public directory

// port setup for server to listen on
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

const db = new sqlite3.Database(dbName, (err) => {
    if(err) {
        console.error("There was an error connecting to the SQLite Database:", err);
    } else {
        // upon successfully connection run createDatabase() method
        console.log("Connected to the SQLite Database");
        createDatabase();
    }
})

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
