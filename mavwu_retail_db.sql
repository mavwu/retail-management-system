CREATE TABLE IF NOT EXISTS garage (
    garage_id INT NOT NULL AUTO_INCREMENT,
    garage_name VARCHAR(255),
    garage_location VARCHAR(255),
    PRIMARY KEY(garage_id)
);

CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_id INT NOT NULL AUTO_INCREMENT,
    warehouse_name VARCHAR(255),
    warehouse_location VARCHAR(255),
    national_price DECIMAL(10,2),
    national_discount DECIMAL(10,2),
    last_dispatch_date DATE,
    PRIMARY KEY(warehouse_id)
);

CREATE TABLE IF NOT EXISTS staff (
    staff_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    staff_email VARCHAR(255),
    staff_phone VARCHAR(255),
    hire_date DATE,
    PRIMARY KEY(staff_id)
);

CREATE TABLE IF NOT EXISTS parts (
    part_id INT NOT NULL AUTO_INCREMENT,
    part_name VARCHAR(255),
    part_price DECIMAL(10,2),
    part_quantity INT,
    PRIMARY KEY(part_id)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    order_date DATETIME,
    customer_id INT,
    part_id INT,
    total_price DECIMAL(10,2),
    order_status VARCHAR(255),
    PRIMARY KEY(order_id)
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    customer_phone VARCHAR(255),
    customer_email VARCHAR(255),
    customer_address VARCHAR(255),
    customer_city VARCHAR(255),
    customer_state VARCHAR(255),
    PRIMARY KEY(customer_id)
);

CREATE TABLE IF NOT EXISTS manager (
    manager_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    manager_email VARCHAR(255),
    manager_phone INT,
    PRIMARY KEY(manager_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    PRIMARY KEY(user_id)
);
