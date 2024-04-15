CREATE DATABASE IF NOT EXISTS mavwu_retail_db;
USING mavwu_retail_db;

CREATE TABLE IF NOT EXISTS local_garage (

);

CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_name varchar(100),
    location varchar(100),

);

CREATE TABLE IF NOT EXISTS staff (
    staff_id int,
    staff_hire_date date,
    PRIMARY KEY(staff_id)
);

CREATE TABLE IF NOT EXISTS parts (
    parts_id int,
    parts_name VARCHAR(100),
    PRIMARY KEY(parts_id)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id int,
    order_date date,
    order_status varchar(100),
    PRIMARY KEY(order_id)
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id int,
    customer_first_name varchar(100),
    customer_last_name varchar(100),
    PRIMARY KEY(customer_id)
);

CREATE TABLE IF NOT EXISTS manager (
    manager_id int,
    manager_first_name VARCHAR(100),
    manager_last_name VARCHAR(100),
    PRIMARY KEY(manager_id)
);