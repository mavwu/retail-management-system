const express = require("express");  // import express. js
const sqlite3 = require("sqlite3");  // import sqlite databse module
const bodyParser = require("body-parser"); //  parse data from request body
const bcrypt = require("bcrypt"); // import module for password hashing 

// some important constants
const salt = 10;
const userID = null;

// table names and database name
const dbName = "mavwu_retail.db";
const user = "users";
const manager = "manager";
const customer = "customer";
const order = "orders";
const parts = "parts";
const staff = "staff";
const warehouse = "warehouse";
const garage = "garage";
const dispatch = "dispatches";
const stock = "stock";

// create express app
const app = express();
const PORT = 3000;
app.use(express.static("public"));  // serve static files from public directory
app.use(bodyParser.json());  // parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // parse URL-encoded bodies

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
    createStockTable();
}

// create garage table
function createGarageTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${garage} (
            garage_id INTEGER PRIMARY KEY AUTOINCREMENT,
            garage_name TEXT NOT NULL UNIQUE,
            street_address TEXT NOT NULL UNIQUE,
            city TEXT NOT NULL UNIQUE,
            province TEXT NOT NULL UNIQUE,
            country TEXT NOT NULL
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Garage Table:", err);
        } else {
            console.log("Successfully created Garage table");

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_name, street_address, city, province, country)
                    VALUES ('Alpha Garage', '123 Main Street', 'Cityville', 'Province A', 'Country X');`);

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_name, street_address, city, province, country)
                    VALUES ('Beta Garage', '456 Elm Street', 'Townsville', 'Province B', 'Country Y');`);

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_name, street_address, city, province, country)
                    VALUES ('Gamma Garage', '789 Oak Street', 'Villagetown', 'Province C', 'Country Z');`);

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_name, street_address, city, province, country)
                    VALUES ('Delta Garage', '321 Pine Street', 'Hamletville', 'Province D', 'Country X');`);

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_name, street_address, city, province, country)
                    VALUES ('Epsilon Garage', '654 Cedar Street', 'Countryside', 'Province E', 'Country Y');`);
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
            console.log("Successfully created Warehouse table");
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
            console.log("Successfully created Staff table");
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
            console.log("Successfully created Parts table");
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
            console.log("Successfully created Order table");
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
            console.error("Failed to create Manager Table");
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
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            phone INTEGER NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            password TEXT NOT NULL,
            admin BOOLEAN DEFAULT FALSE
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Users Table:", err);
        } else {
            console.log("Successfully created Users Table");

            // check if admin exists
            const adminExists = await new Promise((resolve) => {
                db.get(`SELECT * FROM ${user} WHERE admin = TRUE`, (err, row) => {
                    if(err) {
                        console.error("Failed to retrieve admin info", err);
                    } else {
                        console.log("Successfully retrieved admin info");
                        resolve(row);
                    }
                })
            });

            // if no then create admin profile
            if(!adminExists) {
                // create admin user profile
                const username = "mavwu";
                const email = "mavwu@retail.mav";
                const pass = "mavwu1234";
                const phone = "0987654321";
                const fName = "Alfred";
                const lName = "Mavwu";

                const hashPass = await bcrypt.hash(pass, salt);  // has admin pass
            
                db.run(`INSERT OR IGNORE INTO ${user} (username, email, phone, first_name, last_name, password, admin)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`, [username, email, phone, fName, lName, hashPass, true], (err) => {
                            if(err) {
                                console.error("There was an error adding Admin to Users Table:", err);
                            } else {
                                console.log("Admin was successfully added to Users Table");
                            }
                        });
            // if yes then skip 
            } else {
                console.log("Admin user exists Admin Creation Skipped...");
            }
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

function createStockTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${stock} (
            stock_id INTEGER PRIMARY KEY AUTOINCREMENT,
            stock_name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            location TEXT NOT NULL,
            garage_id INTEGER,
            warehouse_id INTEGER,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (part_id) REFERENCES part(part_id),
            FOREIGN KEY (garage_id) REFERENCES garage(garage_id),
            FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id)
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Stock Table:", err);
        } else {
            console.log("Successfully created Stock Table");
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
            db.run(`INSERT OR IGNORE INTO ${user} (email, phone, first_name, last_name, password)
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
    const { email, password } = req.body;

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
        if (!userExist) {
            console.log("User not found");
            return res.status(401).send("Invalid email or password!")
        }

        // if user is found in database
        else {
            let enteredPassHash = await bcrypt.hash(password, salt);

            // compare if password entered is the same as password in database
            const passValidation = bcrypt.compare(password, userExist.password);

            if (passValidation) {
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

// add stock route ******************************************************
app.post("addStock", async (req, res) => {
    const {stock_name, location, warehouse_id, garage_id, price, } = req.body;
});