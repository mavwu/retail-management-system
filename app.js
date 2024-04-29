const express = require("express");  // import express. js
const sqlite3 = require("sqlite3");  // import sqlite databse module
const bodyParser = require("body-parser"); //  parse data from request body
const bcrypt = require("bcrypt"); // import module for password hashing 

// some important constants
const salt = 10;

// table names and database name
const dbName = "mavwu_retail_db";
const user = "users";
const manager = "manager";
const customer = "customer";
const order = "orders";
const parts = "parts";
const staff = "staff";
const warehouse = "warehouse";
const garage = "garage";
const dispatch = "dispatches";

// create express app
const app = express();
const PORT = 3000;
app.use(express.static("public"));  // serve static files from public directory
app.use(bodyParser.json());  // parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true}));  // parse URL-encoded bodies

// port setup for server to listen on
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// create sqlite3 database
const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error("There was an error connecting to the SQLite Database:", err);
    } else {
        // upon successfully connection run createDatabase() method
        console.log("Connected to the SQLite Database");
        createDatabase();
    }
});

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
    createDispatchesTable();
}

// create garage table
function createGarageTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${garage} (
            garage_id INTEGER PRIMARY KEY AUTOINCREMENT,
            garage_name TEXT NOT NULL,
            garage_address TEXT NOT NULL
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Garage Table:", err);
        } else {
            console.log("Successfully created garage table");
        }
    }
    );
}

// create warehouse table
function createWarehouseTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${warehouse} (
            warehouse_id INTEGER PRIMARY KEY AUTOINCREMENT,
            warehouse_name TEXT NOT NULL,
            warehouse_address TEXT NOT NULL,
            national_price NUMERIC,
            national_discount NUMERIC,
            dispatch_id INTEGER,
            garage_id INTEGER,
            FOREIGN KEY (dispatch_id) REFERENCES dispatches(dispatch_id),
            FOREIGN KEY (garage_id) REFERENCES garage(garage_id)
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Warehouse Table:", err);
        } else {
            console.log("Successfully created warehouse table");
        }
    }
    );
}

// create staff table
function createStaffTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${staff} (
            staff_id INTEGER PRIMARY KEY AUTOINCREMENT,
            staff_name TEXT NOT NULL,
            staff_address TEXT NOT NULL
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Staff Table:", err);
        } else {
            console.log("Successfully created staff table");
        }
    }
    );
}

// create parts table
function createPartsTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${parts} (
            part_id INTEGER PRIMARY KEY AUTOINCREMENT,
            part_name TEXT NOT NULL,
            part_price INTEGER NOT NULL
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Parts Table:", err);
        } else {
            console.log("Successfully created parts table");
        }
    }
    );
}

// create order table
function createOrderTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${order} (
            order_id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_date TEXT NOT NULL,
            order_status TEXT NOT NULL,
            order_total INTEGER NOT NULL
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Order Table");
        } else {
            console.log("Successfully created order table");
        }
    }
    );
}

// create customer table
function createCustomerTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${customer} (
            customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone INTEGER NOT NULL
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Customer Table:", err);
        } else {
            console.log("Successfully created Customer Table");
        }
    }
    );
}

// create manager table
function createManagerTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${manager} (
            manager_id INTEGER PRIMARY KEY AUTOINCREMENT,
            manager_name TEXT NOT NULL,
            manager_email TEXT NOT NULL,
            manager_phone INTEGER NOT NULL
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Users Table");
        } else {
            console.log("Successfully created Manager Table");
        }
    }
    );
}

function createUsersTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${user} (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            phone INTEGER NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            password TEXT NOT NULL
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Users Table:", err);
        } else {
            console.log("Successfully created Users Table");
        }
    }
    );
}

function createDispatchesTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${dispatch} (
            dispatch_id INTEGER PRIMARY KEY AUTOINCREMENT,
            dispatch_name TEXT NOT NULL,
            dispatch_date DATETIME,
            garage_id INTEGER,
            warehouse_id INTEGER,
            FOREIGN KEY (garage_id) REFERENCES garage(garage_id),
            FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id)
        );`, async (err) => {
        if (err) {
            console.err("Failed to create Dispatches Table:", err);
        } else {
            console.log("Successfully created Dispatches Table");
        }
    }
    );
}

// sign up route **********************************************
app.post("/userRegistration", async (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;

    try {
        // check if password is at least 8 characters 

        
        // check if user exists in system
        const userExist = await new Promise((resolve) => {
            db.get(`SELECT * FROM ${user}
                WHERE email = ? `, [email], (err, row) => {
                resolve(row);
            });
        });

        if (userExist) {
            return res.status(400).send("Email already in use by another account")
        } else {
            // user does not exist proceed with hashing password
            const hashPassword = await bcrypt.hash(password, salt);

            // insert a user to the database
            db.run(`INSERT INTO ${user} (email, phone, first_name, last_name, password)
                    VALUES (?, ?, ?, ?, ?)`, [email, phone, first_name, last_name, hashPassword], (err) => {
                if (err) {
                    console.error("There was an error during registration:", err);
                    res.status(500).send("Internal Server Error");
                } else {
                    console.log("New user successfully added to database!");
                    res.redirect("/login/login.html");  // redirect user to login page after successful login
                }
            });
        }
    } catch (err) {
        console.error("There was an error during registration:", err);
     
        res.status(400).send("Bad Request");
    }
});

// login route *************************************************************
app.post("/submitLoginDetails", async (req, res) => {
    const {email, password} = req.body;

    try {
        // checking if email exists in database
        const userExist = await new Promise((resolve) => {
            db.get(`SELECT * FROM ${user}
                    WHERE email = ?`, [email], (err, row) => {
                        resolve(row);
                    });
        });

        console.log("User Exist:", userExist);

        // if user is not found in database
        if(!userExist) {
            console.log("User not found");
            return res.status(401).send("Invalid email or password!")
        } 
        
        // if user is found in database
        else {
            let enteredPassHash = await bcrypt.hash(password, salt);

            // compare if password entered is the same as password in database
            const passValidation = bcrypt.compare(password, userExist.password);

            if(passValidation) {
                console.log("Successful login!");
                res.redirect(`/dashboard/dashboard.html`);  // redirect to dashboard
            } else {
                console.log("Invalid email or password");
                return res.status(401).send("Invalid email or password");
            }
        }

    } catch (err) {
        console.error("An error occurred during login:", err);
    }
});