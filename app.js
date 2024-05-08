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
            garage_id INTEGER PRIMARY KEY,
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

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_id, garage_name, street_address, city, province, country)
                    VALUES (1, 'Alpha Mav', '123 Main Street', 'Cityville', 'Province A', 'Country X');`);

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_id, garage_name, street_address, city, province, country)
                    VALUES (2, 'Beta Mav', '456 Elm Street', 'Townsville', 'Province B', 'Country Y');`);

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_id,garage_name, street_address, city, province, country)
                    VALUES (3, 'Gamma Mav', '789 Oak Street', 'Villagetown', 'Province C', 'Country Z');`);

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_id, garage_name, street_address, city, province, country)
                    VALUES (4, 'Delta Mav', '321 Pine Street', 'Hamletville', 'Province D', 'Country X');`);

            db.run(`INSERT OR IGNORE INTO ${garage} (garage_id, garage_name, street_address, city, province, country)
                    VALUES (5, 'Epsilon Mav', '654 Cedar Street', 'Countryside', 'Province E', 'Country Y');`);
        }
    }
    );
}

// create warehouse table
function createWarehouseTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${warehouse} (
            warehouse_id INTEGER PRIMARY KEY,
            warehouse_name TEXT NOT NULL,
            street_address TEXT NOT NULL,
            city TEXT NOT NULL UNIQUE,
            province TEXT NOT NULL,
            country TEXT NOT NULL,
            dispatch_id INTEGER,
            garage_id INTEGER,
            FOREIGN KEY (dispatch_id) REFERENCES dispatches(dispatch_id),
            FOREIGN KEY (garage_id) REFERENCES garage(garage_id)
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Warehouse Table:", err);
        } else {
            console.log("Successfully created Warehouse table");

            db.run(`INSERT OR IGNORE INTO ${warehouse} (warehouse_id, warehouse_name, street_address, city, province, country)
                    VALUES(1, 'Auto Parts Central', '789 Main Street', 'Cityville', 'Stateville', 'Countryland');`);

            db.run(`INSERT OR IGNORE INTO ${warehouse} (warehouse_id, warehouse_name, street_address, city, province, country)
                    VALUES(2, 'National Auto Supplies', '456 Elm Avenue', 'Townsville', 'Statevill', 'Countryland');`);

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
            part_name TEXT NOT NULL UNIQUE,
            part_price DECIMAL NOT NULL,
            stock_id INTEGER NOT NULL,
            FOREIGN KEY (stock_id) REFERENCES ${stock} (stock_id)
        );`, async (err) => {
        if (err) {
            console.error("Failed to create Parts Table:", err);
        } else {
            console.log("Successfully created Parts table");

            // add parts to part table
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Piston', 100.00, 1);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Crankshaft', 100.00, 1);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Camshaft', 100.00, 1);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Cylinder head', 100.00, 1);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Timing belt', 100.00, 1);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Clutch kit', 200.00, 2);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Gearbox', 200.00, 2);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Transmission fluid', 200.00, 2);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Torque converter', 200.00, 2);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Shift solenoid', 200.00, 2);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Shock absorbers', 300.00, 3);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Control arms', 300.00, 3);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Tie rods', 300.00, 3);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Steering rack', 300.00, 3);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Sway bar', 300.00, 3);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Brake pads', 400.00, 4);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Brake rotors', 400.00, 4);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Brake calipers', 400.00, 4);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Brake lines', 400.00, 4);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Brake master cylinder', 400.00, 4);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Alternator', 500.00, 5);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Starter motor', 500.00, 5);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Battery', 500.00, 5);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Ignition coil', 500.00, 5);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Spark plugs', 500.00, 5);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Exhaust manifold', 600.00, 6);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Catalytic converter', 600.00, 6);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Muffler', 600.00, 6);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Exhaust pipe', 600.00, 6);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Oxygen sensor', 600.00, 6);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Radiator', 700.00, 7);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Water pump', 700.00, 7);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Thermostat', 700.00, 7);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Cooling fan', 700.00, 7);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Radiator hose', 700.00, 7);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Fuel pump', 800.00, 8);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Fuel injector', 800.00, 8);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Fuel filter', 800.00, 8);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Fuel pressure regulator', 800.00, 8);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Fuel tank', 800.00, 8);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Bumper', 900.00, 9);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Fender', 900.00, 9);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Hood', 900.00, 9);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Door panel', 900.00, 9);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Quarter panel', 900.00, 9);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Dashboard', 1000.00, 10);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Seats', 1000.00, 10);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Carpet', 1000.00, 10);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Door trim', 1000.00, 10);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Headliner', 1000.00, 10);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Turbocharger', 1100.00, 11);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Supercharger', 1100.00, 11);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Cold air intake', 1100.00, 11);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Performance exhaust system', 1100.00, 11);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Performance camshaft', 1100.00, 11);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Oil filter', 1100.00, 12);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Air filter', 1100.00, 12);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Cabin air filter', 1100.00, 12);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Serpentine belt', 1100.00, 12);`);
            db.run(`INSERT OR IGNORE INTO ${parts} (part_name, part_price, stock_id) VALUES ('Timing belt kit', 1100.00, 12);`);
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
                    if (err) {
                        console.error("Failed to retrieve admin info", err);
                    } else {
                        console.log("Successfully retrieved admin info");
                        resolve(row);
                    }
                })
            });

            // if no then create admin profile
            if (!adminExists) {
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
                    if (err) {
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
            location TEXT,
            national_price DECIMAL,
            national_discount DECIMAL,
            garage_id INTEGER,
            warehouse_id INTEGER,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
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
app.post("/addStock", async (req, res) => {
    try {
        const { stock_name, location, warehouse_id, garage_id, price, discount } = req.body;
        console.log(req.body);

        db.run(`INSERT INTO ${stock} (stock_name, location, national_price, national_discount, garage_id, warehouse_id)
                VALUES (?, ?, ?, ?, ?, ?)`, [stock_name, location, price, discount, garage_id, warehouse_id], (err) => {
                    if(err) {
                        console.error("Failed to add Stock to database:", err);
                        res.status(500).send("Internal Server Error");
                    } else {
                        console.log("Successfully added Stock to database");
                        res.redirect(`/dashboard/dashboard.html`);
                    }
                })
    } catch (error) {
        console.error("Error in addStock request:", error);
        res.status(400).send("Bad Request");
    }
});

// view stock route *********************************************
app.get("/viewStock", async (req, res) => {
    try {
        // query the database for available stock
        const availableStock = await new Promise((resolve, reject) => {
            db.all(`SELECT stock_name, location, national_price AS price, national_discount AS discount FROM ${stock}`, (err, rows) => {
                if (err) {
                    console.error('Error fetching available stock:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        
        // send available stock info as a JSON response for the frontend
        res.json(availableStock);

    } catch (error) {
        console.error('Error fetching available stock:', error);
        res.status(500).json({ error: 'An error occurred while fetching available stock' });
    }
});
