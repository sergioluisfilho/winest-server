-- Active: 1681776890906@@127.0.0.1@3306@winest

CREATE TABLE
    users(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        email varchar(255) UNIQUE NOT NULL,
        password varchar(20) NOT NULL,
        name varchar(255) NOT NULL,
        birthday_date DATE,
        phone_number VARCHAR(15),
        created_at DATETIME,
        updated_at DATETIME
    ) DEFAULT CHARSET UTF8